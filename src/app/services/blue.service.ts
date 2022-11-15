import { Injectable } from '@angular/core';

import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlurService {

  public toAddEmployee: boolean = false;
  public addEmployee = new Subject<boolean>();

  constructor() { }

  addEmployeeFunc(){
    this.toAddEmployee = !this.toAddEmployee;
    if(this.toAddEmployee){
      this.addEmployee.next(true);
    }else{
      this.addEmployee.next(false);
    }
  }
}