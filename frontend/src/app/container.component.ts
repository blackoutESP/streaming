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
  @Output() checked: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public videos: string[] = [];
  private token: string = '';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private videosService: VideosService) {
  }

  // this.router.navigate(['videos/'], { skipLocationChange: true });
  ngOnInit(): void {
    this.feedVideoList();
    this.loginService.login().pipe().subscribe((response: any) => {
      const data = JSON.parse(JSON.stringify(response));
      this.token = data.token;
      sessionStorage.setItem('token', this.token);

    });
  }

  public feedVideoList(): void {
    this.loaded.next(false);
    this.videosService.getVideos().subscribe((response: any) => {
      response['data'].forEach((item: string) => this.videos.push(item));
      if (this.videos.length > 0) {
        this.loaded.next(true);
      }
    });
  }

  public getVideoById(id: string): void {
    this.videosService.getVideoById(id, this.token).subscribe((response: any) => {
      console.log(response);
    });
  }

  switchTheme(event: any): void {
    if (!event.checked) { // Dark theme
      this.themeSelected.next('Dark');
      this.checked.next(true);
    } else { // Light theme
      this.themeSelected.next('Light');
      this.checked.next(false);
    }
  }
}
