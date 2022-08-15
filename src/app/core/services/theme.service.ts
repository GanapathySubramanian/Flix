import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  white: string = '#ffffff';
  black: string = '#141313';

  private _themeDark: Subject<boolean> = new Subject<boolean>();

  isThemeDark = this._themeDark.asObservable();

  constructor() { }

  setDarkTheme(isThemeDark: boolean) {
    this._themeDark.next(isThemeDark);

    if (isThemeDark == true) {
      console.log('Dark Used');

      // #1a242f #0f3b43 #141414
      document.documentElement.style.setProperty("--primary-color", "black");
      document.documentElement.style.setProperty("--secondary-color", "#1a242f");
      document.documentElement.style.setProperty("--placeholder-color", "#1a242f");
    }
    else {
      console.log('Light Used');
      document.documentElement.style.setProperty("--primary-color", "#22254b");
      document.documentElement.style.setProperty("--secondary-color", "#373b69");
      document.documentElement.style.setProperty("--placeholder-color", "#7378c5");

    }
  }

}
