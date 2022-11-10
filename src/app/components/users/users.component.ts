import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private _empService: EmployeesService) { }

  ngOnInit(): void {
    this._empService.getEmployees().subscribe(value => this.employees = value)
  }

}
