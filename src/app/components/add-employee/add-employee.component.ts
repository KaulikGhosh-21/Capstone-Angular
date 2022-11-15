import { Component, OnInit } from '@angular/core';

import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ThemeService } from 'src/app/services/theme.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/Employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  idArr: number[] = [];
  employees: Employee[] = [];

  highestId!: number;

  public theme: string = "dark";

  validateStrings = {
    emailId: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    password: /^[\w@-]{8,20}$/
  }

  id!: number;

  firstName!: string;
  lastName!: string;
  gender!: string;
  locationBase!: string;
  emailId!: string;
  doj!: Date;
  dob!: Date;

  passwordEqualsConfirmPassword: boolean = true;
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;

  constructor(
      private _alterService: AlterHeaderService, 
      private _router: Router, 
      private _themeService: ThemeService,
      private _route: ActivatedRoute,
      private _empService: EmployeesService
    ) {
    this._themeService.theme.subscribe(value => this.theme = value);
   }

  ngOnInit(): void {

    // finding the highest id present in db
    this._empService.getEmployees().subscribe(val => {
      this.employees = val;
      console.log(this.employees)
      this.employees.forEach(employee => {
        if(employee.id !== undefined){
          this.idArr.push(employee.id);
        }
      })
      console.log(this.idArr)
      this.highestId = Math.max(...this.idArr);
      console.log(this.highestId);
    })


    


    let theme: string = localStorage.getItem("theme") as string;
    this.theme = theme;
    let url: string = this._router.url;
    if(!url.includes("home")){
      this._alterService.showHomeFunc(true);
    }else{
      this._alterService.showHomeFunc(false)
    }

    //finding the url
    this._route.params.subscribe(params => {
      let id: number = Number(params['id']);
      console.log(id);
      this.id = id;
    })
  }

  onAddFormSubmit(form: any){;

    const newEmployee = {
      "id": this.highestId + 1,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "emailId": this.emailId,
      "gender": this.gender,
      "locationBase": this.locationBase,
      "dob": this.dob,
      "doj": this.doj
    }

    form.reset();

    console.log(newEmployee);

    this._empService.addEmployee(newEmployee).subscribe();
    this._router.navigate(['../'], {relativeTo:this._route})
    Swal.fire({
      icon: 'success',
      title: 'Congrats...',
      text: 'You have successfully added a new employee'
    })

  }

  handlePasswordChange(form: any){
    console.log("Hello")
    console.log(form)
    if(this.validateStrings.password.test(form.form.controls.password.value)){
      this.isPasswordValid = true;
    }else{
      this.isPasswordValid = false;
    }
  }

  handleEmailChange(form: any){
    // console.log(form.form.controls['emailId'].valid)
    if(this.validateStrings.emailId.test(form.form.controls['emailId'].value)){
      // console.log("emailId is valid")
      this.isEmailValid = true;
    }else{
      // console.log("emailId is invalid")
      this.isEmailValid = false;
    }
  }

  onChange(event: any){
    this.gender = event.target.value;
  }

}
