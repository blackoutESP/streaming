import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme = new Subject<boolean>();
  isDarkTheme = this.theme.asObservable();

  public toggleTheme(theme: boolean): void {
    console.log(theme);
    this.theme.next(theme);
  }
}
