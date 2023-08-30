import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container implements OnInit, OnDestroy {

  public title = 'Small Streaming Service';
  private user: object = {};
  private handlerInfo: object = {
    ok: Boolean,
    data: [],
    errors: []
  };
  private $handler: BehaviorSubject<any>;
  private $destroyed: BehaviorSubject<boolean>;

  private constructor(private router: Router) {
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
