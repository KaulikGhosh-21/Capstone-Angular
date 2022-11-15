import { Component, OnInit } from '@angular/core';

import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ThemeService } from 'src/app/services/theme.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/Employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  idArr: number[] = [];
  employees: Employee[] = [];

  highestId!: number;

  empId!: number;

  firstName!: string;
  lastName!: string;
  gender!: string;
  location!: string;
  email!: string;
  doj!: Date;
  dob!: Date;

  public theme: string = "dark";

  validateStrings = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    password: /^[\w@-]{8,20}$/
  }


  // passwordEqualsConfirmPassword: boolean = true;
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;

  constructor(
    private _alterService: AlterHeaderService, 
    private _router: Router, 
    private _themeService: ThemeService,
    private _empService: EmployeesService,
    private _route: ActivatedRoute
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
  }

  onRegisterFormSubmit(form: any){

    const newEmployee = {
      "id": this.highestId + 1,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "emailId": this.email,
      "gender": this.gender,
      "locationBase": this.location,
      "dob": this.dob,
      "doj": this.doj
    }

    form.reset();

    console.log(newEmployee);

    this._empService.addEmployee(newEmployee).subscribe();
    Swal.fire({
      icon: 'success',
      title: 'Congrats...',
      text: 'You have successfully registered yourself in our portal'
    })
    // this._router.navigate(['../'], {relativeTo:this._route})
    // alert("You have been added successfully");



    // // console.log(typeof(form.form.controls.dob.value));
    console.log(form)
    // this._empService.addEmployee(newEmployee).subscribe();

    // alert("You have successfully registered in our system.")
    // if(this.confirmPassword !== this.password){
    //   this.passwordEqualsConfirmPassword = false;
    // }else{
    //   this.passwordEqualsConfirmPassword = true
    // }

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
    console.log(!form.form.controls['valid'])
    if(this.validateStrings.email.test(form.form.controls.email.value)){
      this.isEmailValid = true;
    }else{
      this.isEmailValid = false;
    }
  }

  onChange(event: any){
    this.gender = event.target.value;
  }

}
