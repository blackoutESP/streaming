import { Component, OnInit, OnDestroy, Output, Sanitizer, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { VideosService } from 'src/app/services/videos.service';
import packageJSON from '../../../package.json';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideosComponent implements OnInit, OnDestroy {

  public title = 'Small Streaming Service';
  public overlay: any;
  @Input() overlayTheme: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  @Input() themeSelected: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  @Input() checked: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private token: string = '';
  public loading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  // public videos: string[] = [];
  public song: string = '';
  public src: string = encodeURI(`http://0.0.0.0:3000/api/videos/`);
  public mobile: boolean = false;
  public version: string = packageJSON.version;

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
  }

  ngOnInit(): void {
    this.auth();

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

  public log(data: string): void {
    console.log(data);
  }

  public switchTheme(event: any): void {
    if (!event.checked) { // dark theme
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
