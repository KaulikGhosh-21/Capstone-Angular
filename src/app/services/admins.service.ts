import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  // private apiUrl = "http://localhost:5500/admins";


  private apiUrl = "https://localhost:7061/api/AdminTables";

  
  constructor(private _http: HttpClient) { }

  getAdmins(): Observable<Admin[]>{
    return this._http.get<Admin[]>(this.apiUrl);
  }
}
