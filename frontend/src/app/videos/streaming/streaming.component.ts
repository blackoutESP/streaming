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
  @Input() overlayTheme: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() themeSelected: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set setThemeSelected(theme: string) {
    console.log(theme);
    this.themeSelected.next(theme);
    this.overlayTheme.next(theme);
  }
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

  public logThemeSelected(theme: string) {
    console.log(theme);
  }

  public switchTheme(data: any): string {
    return data;
  }
}
