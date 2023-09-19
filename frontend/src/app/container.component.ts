import { Component, OnInit, Output, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';
import { VideosService } from './services/videos.service';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container implements OnInit {

  public title = 'Small Streaming Service';
  public version = '2.0-1';
  @Output() themeSelected: BehaviorSubject<string> = new BehaviorSubject('Dark');
  @Output() checked: boolean = true;
  public VERSION = VERSION.full; // Angular Version
  private token: string = '';
  public videos: string[] = [];
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(
    private router: Router,
    private loginService: LoginService,
    private videosService: VideosService) {
  }

  // this.router.navigate(['videos/'], { skipLocationChange: true });
  ngOnInit(): void {
    // this.loaded.next(true);
    this.feedVideoList();
    this.loginService.login().pipe().subscribe(response => {
      console.log(response);
      const data = JSON.parse(JSON.stringify(response));
      this.token = data['token'];
      console.log(this.token);
      sessionStorage.setItem('token', this.token);

    });
  }

  public feedVideoList(): void {
    this.videos.push('COSTA - DICEN QUE SOY EL DIABLO (OFFICIAL MUSIC VIDEO).webm');
    this.videos.push('Evanescence_Hi - Lo featuring Lindsey Stirling(Official Music Video).webm');
  }

  switchTheme(event: any): void {
    if (!event.checked) { // Dark theme
      this.themeSelected.next('Dark');
      this.checked = true;
    } else { // Light theme
      this.themeSelected.next('Light');
      this.checked = false;
    }
  }
}
