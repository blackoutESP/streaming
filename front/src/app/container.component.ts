import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container {

  public title = 'Small Streaming Service';
  public version = '2.0-1';

  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }
}
