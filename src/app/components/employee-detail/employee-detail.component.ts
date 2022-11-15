import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  empId!: number;

  employee!: Employee;

  constructor(private _router: Router, private _route: ActivatedRoute, private _empService: EmployeesService) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id: number = Number(params['empId']);
      console.log(id);
      this.empId = id;

      this._empService.getSpecificEmployee(this.empId).subscribe(value => {
        this.employee = value;
        console.log(this.employee);
      })
    })
  }

}
