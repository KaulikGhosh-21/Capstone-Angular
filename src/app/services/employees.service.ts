import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { Employee } from '../Employee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  //private apiUrl = "http://localhost:5000/employees";


  private apiUrl = "https://localhost:7061/api/Employees";


  //public name: string= "Kaulik";

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this._http.get<Employee[]>(this.apiUrl)
  }

  editEmployee(employee: Employee): Observable<Employee>{
    const updateUrl = `${this.apiUrl}/${employee.id}`;
    return this._http.put<Employee>(updateUrl, employee, httpOptions)
  }

  addEmployee(employee: Employee): Observable<Employee>{
    return this._http.post<Employee>(this.apiUrl, employee, httpOptions);
  }

  deleteEmployee(employee: Employee): Observable<Employee>{
    const deleteUrl = `${this.apiUrl}/${employee.id}`;
    return this._http.delete<Employee>(deleteUrl);
  }

  getSpecificEmployee(id: number): Observable<Employee>{
    const searchUrl = `${this.apiUrl}/${id}`;
    return this._http.get<Employee>(searchUrl);
  }
}
