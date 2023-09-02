import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.theme.scss']
})
export class Container implements OnInit {

  public title = 'Small Streaming Service';
  public version = '2.0';
  @Output() themeSelected: BehaviorSubject<string> = new BehaviorSubject('dark');

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // this.router.navigate(['videos/all'], { skipLocationChange: false });
  }

  switchTheme(event: any): void {
    this.themeSelected.next('light');
    this.themeSelected.complete();
  }
}
