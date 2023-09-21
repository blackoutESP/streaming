import { Component, OnInit, OnDestroy, Output, Sanitizer, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { VideosService } from 'src/app/services/videos.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import packageJSON from '../../../package.json';

@Component({
  selector: 'streaming',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StreamingComponent implements OnInit, OnDestroy {

  public overlay: any;
  @Input() overlayTheme: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  @Input() set setOverlay(theme: string) {
    console.log(theme);
    this.themeSelected.next(theme);
  }
  @Input() themeSelected: BehaviorSubject<string> = new BehaviorSubject('Dark');
  @Input() checked: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public title = 'Small Streaming Service';
  public version: string = packageJSON.version;
  public src: string = encodeURI(`http://0.0.0.0:3000/api/videos/`);
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public song: string = '';
  public videos: string[] = [];
  public type: string = '';
  private token: string = '';
  public mobile: boolean = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private videosService: VideosService,
    private sanitizer: Sanitizer) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS/i.test(navigator.userAgent)) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    this.overlay = this.overlayContainer.getContainerElement();
    console.log(this.overlay);
    this.router.navigate(['streaming'], { skipLocationChange: false });
  }

  ngOnInit(): void {
    this.feedVideoList();
  }

  ngOnDestroy(): void {

  }

  public feedVideoList(): void {

    this.videosService.getVideos().pipe().subscribe((response: any) => {
      response['data'].forEach((item: string) => this.videos.push(item));
      this.loaded.next(true);
      if (this.videos.length > 0) {

      }

    });
  }

  public getVideoById(id: string): any {
    console.log(id);
    this.song = id;
    if (id) {
      // this.url = this.sanitizer.sanitize(4, encodeURI(`http://0.0.0.0:3000/api/videos/${id}?authorization=Bearer ${this.token}`)) || '';
      this.src = `http://0.0.0.0:3000/api/videos/${id}?authorization=Bearer ${this.token}`;
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { query: encodeURI(`/videos/${id}?authorization=Bearer ${this.token}`) },
          queryParamsHandling: 'merge'
        });
    }
  }

  public switchTheme(event: any): void {
    console.log(event);
    console.log(this.overlay);
    if (!event.checked) { // dark theme
      this.overlay.classList.remove('light-theme');
      this.overlay.classList.add('dark-theme');
      this.overlayTheme.next('dark-theme');
      this.themeSelected.next('Dark');
      this.checked.next(true);
    } else { // Light theme
      this.overlay.classList.remove('dark-theme');
      this.overlay.classList.add('light-theme');
      this.overlayTheme.next('light-theme');
      this.themeSelected.next('Light');
      this.checked.next(false);
    }
  }
}
