import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { BlurService } from 'src/app/services/blue.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { ThemeService } from 'src/app/services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  toAddEmployee: boolean = false;

  employees: Employee[] = [];

  filteredEmployees: Employee[] = [];

  search!: string;

  toShowSearchBar: boolean = false;

  public theme: string = "dark";

  toShowDetail: boolean = false;

  constructor( 
      private _empService: EmployeesService, 
      private _themeService: ThemeService, 
      private _router: Router,
      private _route: ActivatedRoute,
      private _alterService: AlterHeaderService
      ) {
    this._themeService.theme.subscribe(value => this.theme = value);
   }

  ngOnInit(): void {
    // alter header
    let url: string = this._router.url;
    if(!url.includes("home")){
      this._alterService.showHomeFunc(true);
    }else{
      this._alterService.showHomeFunc(false)
    }

    
    console.log(this._router.url)
    let theme: string = localStorage.getItem("theme") as string;
    this.theme = theme;

    // get employees
    this._empService.getEmployees().subscribe(value => {
      console.log(value)
      this.employees = value;
      this.filteredEmployees = value;
    })
  }

  // currentClasses: Record<string, boolean> = {}

  // setClasses(){
  //   this.currentClasses = {
  //     dark: this.theme == "dark",
  //     light: this.theme == "light",
  //     blur: this.toAddEmployee 
  //   }
  // }

  goToDetail(employee: Employee){
    this._router.navigate([`detail/${employee.id}`], {relativeTo: this._route});
  }

  searchClicked(){
    this.toShowSearchBar = !this.toShowSearchBar;
  }

  seeSearchBar(event: any){
      this.filteredEmployees = this.employees.filter(value => {
        return value.firstName.toLowerCase().includes(event.toLowerCase())
      })
    }

  addEmployee(){
    this._router.navigate(['add-employee'], {relativeTo: this._route});
    // this._blueService.addEmployee.subscribe(value => this.toAddEmployee = value);
  }

  goToEdit(employee: Employee){
    this._router.navigate([`edit/${employee.id}`], {relativeTo: this._route})
    console.log(employee)
  }

  deleteEmployee(employee: Employee){
    Swal.fire({
      title: `Are you sure you want delete the record of ${employee.firstName}`,
      showDenyButton: true,
      confirmButtonText: `Don't Delete`,
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Profile not deleted', '', 'info')
      }
      else if (result.isDenied) {
        this._empService.deleteEmployee(employee).subscribe(() => {
          Swal.fire({
            icon: 'error',
            title: 'Deleted',
            text: `Profile of ${employee.firstName} deleted successfully`,
          })
          window.location.reload();
      })
    }
  })
  }
}
