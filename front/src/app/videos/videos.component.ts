import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit, OnDestroy {
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
}
