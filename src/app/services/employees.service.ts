import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = "http://localhost:5000/employees";

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this._http.get<Employee[]>(this.apiUrl)
  }
}
