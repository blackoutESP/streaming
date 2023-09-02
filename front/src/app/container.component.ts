import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container implements OnInit {

  public title = 'Small Streaming Service';
  public version = '2.0';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    // this.router.navigate(['videos/all'], { skipLocationChange: false });
  }
}
