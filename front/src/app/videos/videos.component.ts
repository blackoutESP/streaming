import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Themes } from '../interfaces/theme-selected.enum';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {
  public title = 'Small Streaming Service';
  public themeSelected: string = Themes.LightTheme;
  private user: object = {};
  private handlerInfo: object = {
    ok: Boolean,
    data: [],
    errors: []
  };
  private $handler: BehaviorSubject<any>;
  private $destroyed: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.$handler  = new BehaviorSubject(this.handlerInfo);
    this.$destroyed = new BehaviorSubject(false);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  handleLogin(): void {

  }

  onThemeSwitch(event: any): void {

  }
}
