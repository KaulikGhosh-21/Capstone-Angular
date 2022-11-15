import { Component, OnInit } from '@angular/core';

import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ThemeService } from 'src/app/services/theme.service';
import { Admin } from 'src/app/Admin';
import { AdminsService } from 'src/app/services/admins.service';
import { BannerService } from 'src/app/services/banner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  admins: Admin[] = [];

  public theme: string = "dark";

  email!: string;
  password!: string;

  constructor(
      private _alterService: AlterHeaderService, 
      private _router: Router, 
      private _themeService: ThemeService,
      private _adminService: AdminsService,
      private _route: ActivatedRoute  ,
      private _bannerService: BannerService
    ) {
    this._themeService.theme.subscribe(value => this.theme = value);
   }

  ngOnInit(): void {
    // theme
    let theme: string = localStorage.getItem("theme") as string;
    this.theme = theme;

    // to alter header bar
    let url: string = this._router.url;
    if(!url.includes("home")){
      this._alterService.showHomeFunc(true);
    }else{
      this._alterService.showHomeFunc(false)
    }

    // to get admins detail
    this._adminService.getAdmins().subscribe(value => {
      // console.log(value);
      this.admins = value
    });
  }

  onSigninFormSubmit(form: any){
    const result = this.admins.filter(admin => {
      return admin.emailId.toLowerCase() == this.email.toLowerCase()
    });
    if(result.length > 0){
      if(result[0].upassword == this.password){
        localStorage.setItem("someoneSignedIn", "true");
        localStorage.setItem("adminSignedIn", result[0].adminName);
        this._router.navigate(["employees"]);
        this._alterService.showLogoutFunc(true);
        
        Swal.fire({
          icon: 'success',
          title: 'Congrats...',
          text: 'You have successfully signed in'
        })

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have entered a wrong password!'
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'You are not a registered admin!',
      })
    }

    // if(this.confirmPassword !== this.password){
    //   this.passwordEqualsConfirmPassword = false;
    // }else{
    //   this.passwordEqualsConfirmPassword = true
    // }

  }

}
