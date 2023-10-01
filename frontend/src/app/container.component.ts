import { Component, OnDestroy, OnInit, Output, Sanitizer, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
    this.router.navigate(['videos/streaming'], { skipLocationChange: false });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
