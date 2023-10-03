import { Component, OnInit, OnDestroy, Sanitizer, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LoginService } from 'src/app/services/login.service';
import { ThemeService } from 'src/app/services/theme.service';
import packageJSON from '../../../package.json';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideosComponent implements OnInit, OnDestroy {

  public overlay: any;

  public theme: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isDarkTheme: Observable<boolean> = this.themeService.isDarkTheme;

  public overlayTheme: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  public themeSelected: BehaviorSubject<string> = new BehaviorSubject('dark-theme');
  public checked: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private token: string = '';
  public loading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  // public videos: string[] = [];
  public mobile: boolean = false;
  public version: string = packageJSON.version;

  constructor(
    private overlayContainer: OverlayContainer,
    private loginService: LoginService,
    private themeService: ThemeService) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS/i.test(navigator.userAgent)) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    this.overlay = this.overlayContainer.getContainerElement();
  }

  ngOnInit(): void {
    this.auth();
    // this.theme.subscribe(theme => console.log(theme));
    this.isDarkTheme.subscribe(theme => console.log(theme));
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

  public toggleTheme(checked: boolean) {
    this.themeService.toggleTheme(checked);
  }

  public switchTheme(event: any): void {
    if (!event.checked) { // dark theme
      this.overlay.classList.remove('light-theme');
      this.overlay.classList.add('dark-theme');
      this.overlayTheme.next('dark-theme');
      this.themeSelected.next('dark-theme');
      this.checked.next(true);
      // this.toggleTheme(this.checked.value);
    } else { // Light theme
      this.overlay.classList.remove('dark-theme');
      this.overlay.classList.add('light-theme');
      this.overlayTheme.next('light-theme');
      this.themeSelected.next('light-theme');
      this.checked.next(false);
      // this.toggleTheme(this.checked.value);
    }
  }
}
