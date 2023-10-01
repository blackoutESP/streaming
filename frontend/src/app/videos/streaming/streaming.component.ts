import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, Output, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoginService } from 'src/app/services/login.service';
import { VideosService } from 'src/app/services/videos.service';
import packageJSON from '../../../../package.json';

@Component({
  selector: 'streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.theme.scss']
})
export class StreamingComponent {

  public overlay: any;
  public theme: BehaviorSubject<string> = new BehaviorSubject('');
  // @Input() themeSelected: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  @Input() set overlaytheme(theme: string) {
    console.log(theme);
    this.theme.next(theme);
  }

  public checked: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public title = 'Small Streaming Service';
  public version: string = packageJSON.version;
  public src: string = encodeURI(`http://0.0.0.0:3000/api/videos/`);
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
    private sanitizer: Sanitizer
  ) {
    this.overlay = this.overlayContainer.getContainerElement();
  }

  get overlaytheme(): string {
    return this.theme.value;
  }

  ngOnInit(): void {
    this.feedVideoList();
  }

  public log(data: any): void {
    console.log(data);
  }

  public feedVideoList(): void {

    this.videosService.getVideos().pipe().subscribe((response: any) => {
      response['data'].forEach((item: string) => this.videos.push(item));
      if (this.videos.length > 0) {
        this.loading.next(false);
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
    if (!event.checked) { // dark theme
      this.overlay.classList.remove('light-theme');
      this.overlay.classList.add('dark-theme');
      this.theme.next('dark-theme');
      // this.themeSelected.next('dark-theme');
      this.checked.next(true);
    } else { // Light theme
      this.overlay.classList.remove('dark-theme');
      this.overlay.classList.add('light-theme');
      this.theme.next('light-theme');
      // this.themeSelected.next('light-theme');
      this.checked.next(false);
    }
  }
}
