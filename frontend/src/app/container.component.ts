import { Component, AfterViewInit, ElementRef, Input, OnInit, Output, Sanitizer, VERSION, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';
import { VideosService } from './services/videos.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container implements OnInit {

  public title = 'Small Streaming Service';
  public version = '2.0-1' || VERSION.full;
  private overlay: any;
  @Input() public overlayTheme = new BehaviorSubject<string>('dark-theme');
  @Output() themeSelected: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  @Output() checked: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public src: string = encodeURI(`http://0.0.0.0:3000/api/videos/`);
  public url: string = '';
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public videos: string[] = [];
  public type: string = '';
  private token: string = '';
  public mobile: boolean = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router,
    private loginService: LoginService,
    private videosService: VideosService,
    private sanitizer: Sanitizer) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS/i.test(navigator.userAgent)) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    this.overlay = this.overlayContainer.getContainerElement();
    // this.router.navigate(['videos'], { skipLocationChange: false });
  }

  ngOnInit(): void {
    this.auth();
    this.feedVideoList();
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

  public log(event: any): void {
    console.log(event.target);
  }

  switchTheme(event: any): void {
    if (!event.checked) { // Dark theme
      this.overlay.classList.remove('light-theme');
      this.overlay.classList.add('dark-theme');
      this.overlayTheme.next('dark-theme');
      this.themeSelected.next('dark-theme');
      this.checked.next(true);
    } else { // Light theme
      this.overlay.classList.remove('dark-theme');
      this.overlay.classList.add('light-theme');
      this.overlayTheme.next('light-theme');
      this.themeSelected.next('light-theme');
      this.checked.next(false);
    }
  }
}
