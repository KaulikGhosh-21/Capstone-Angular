import { Injectable } from '@angular/core';

import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public themeIsDark: boolean = true;
  public theme = new Subject<string>();

  constructor() { }

  switchTheme(){
    this.themeIsDark = !this.themeIsDark;
    if(!this.themeIsDark){
      this.theme.next("light");
      localStorage.setItem("theme", "light");
    }else{
      this.theme.next("dark");
      localStorage.setItem("theme", "dark")
    }
  }
}
