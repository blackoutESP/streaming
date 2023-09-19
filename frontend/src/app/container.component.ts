import { Component, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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
  @Output() themeSelected: BehaviorSubject<string> = new BehaviorSubject('Dark');
  @Output() checked: boolean = true;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // this.router.navigate(['videos/'], { skipLocationChange: true });
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
