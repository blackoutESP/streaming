import { Component, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { LoginService } from './services/login.service';
import { VideosService } from './services/videos.service';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container implements OnInit {

  public title = 'Small Streaming Service';
  public version = '2.0';
  @Output() themeSelected: BehaviorSubject<string> = new BehaviorSubject('Dark');
  @Output() checked: boolean = true;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private videosService: VideosService) {
  }

  ngOnInit(): void {
    // this.router.navigate(['videos/'], { skipLocationChange: true });
    this.loginService.login().pipe().subscribe(response => {
      const data = JSON.parse(JSON.stringify(response));
      sessionStorage.setItem('token', data['token']);
    });
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
