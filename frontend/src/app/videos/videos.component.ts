import { Component, OnInit, OnDestroy, Output, Sanitizer, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { VideosService } from 'src/app/services/videos.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import packageJSON from '../../../package.json';
import { Themes } from 'src/app/interfaces/theme-selected.enum';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {

  private overlay: any;
  @Input() public overlayTheme = new BehaviorSubject<string>('dark-theme');
  @Output() themeSelected: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  @Output() checked: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public title = 'Small Streaming Service';
  public version: string = packageJSON.version;
  public src: string = encodeURI(`http://0.0.0.0:3000/api/videos/`);
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public videos: string[] = [];
  public type: string = '';
  private token: string = '';
  public mobile: boolean = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router,
    private routerOutlet: RouterOutlet,
    private loginService: LoginService,
    private videosService: VideosService,
    private sanitizer: Sanitizer
  ) {
  }

  ngOnInit(): void {
    this.feedVideoList();
  }

  ngOnDestroy(): void {

  }

  private auth(): void {
    this.loginService.login().pipe().subscribe((response: any) => {
      const data = JSON.parse(JSON.stringify(response));
      this.token = data.token;
      sessionStorage.setItem('token', this.token);
    });
  }

  public feedVideoList(): void {
    this.loaded.next(false);
    this.videosService.getVideos().pipe().subscribe((response: any) => {
      response['data'].forEach((item: string) => this.videos.push(item));
      if (this.videos.length > 0) {
        this.loaded.next(true);
      }
    });
  }

  public getVideoById(id: string): any {
    console.log(id);
    if (id) {
      // this.url = this.sanitizer.sanitize(4, encodeURI(`http://0.0.0.0:3000/api/videos/${id}?authorization=Bearer ${this.token}`)) || '';
      this.src = encodeURI(`http://0.0.0.0:3000/api/videos/${id}?authorization=Bearer ${this.token}`);
      this.type = 'video/webm';
    }
  }

  switchTheme(event: any): void {
    console.log(event.checked);
  }
}
