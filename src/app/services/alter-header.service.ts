import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlterHeaderService {

  public showHome = new Subject<boolean>();

  constructor() { }

  showHomeFunc(val: boolean){
    this.showHome.next(val);
  }
}
