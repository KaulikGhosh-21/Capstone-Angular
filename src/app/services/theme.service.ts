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
    if(this.themeIsDark){
      this.theme.next("dark");
    }else{
      this.theme.next("light");
    }
  }
}
