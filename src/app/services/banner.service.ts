import { Injectable } from '@angular/core';

import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  showBanner = new Subject<boolean>();

  constructor() { }

  toShowBanner(val: boolean){
    this.showBanner.next(val);
  }
}
