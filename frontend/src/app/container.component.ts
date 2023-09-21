import { Component, Input, OnDestroy, OnInit, Output, Sanitizer, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';
import { VideosService } from './services/videos.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import packageJSON from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Container implements OnInit, OnDestroy {

  private overlay: any;
  @Output() public overlayTheme = new BehaviorSubject<string>('dark-theme');
  @Output() public themeSelected: BehaviorSubject<string> = new BehaviorSubject('Dark');
  @Output() public checked: BehaviorSubject<boolean> = new BehaviorSubject(true);
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
    private loginService: LoginService,
    private videosService: VideosService,
    private sanitizer: Sanitizer) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS/i.test(navigator.userAgent)) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    this.overlay = this.overlayContainer.getContainerElement();
    this.router.navigate(['streaming'], { skipLocationChange: false });
  }

  ngOnInit(): void {
    this.auth();
    // this.feedVideoList();
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

  switchTheme(event: any): void {
    if (!event.checked) { // Dark theme
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
