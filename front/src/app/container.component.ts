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

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.navigate(['videos/all'], { skipLocationChange: false });
  }
}
