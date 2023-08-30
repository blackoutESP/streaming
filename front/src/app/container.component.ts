import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container {

  public title = 'Small Streaming Service';
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
    this.router.navigate(['videos/all'], { skipLocationChange: false });
  }
}
