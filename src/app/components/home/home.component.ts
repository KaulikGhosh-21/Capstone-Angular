import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AlterHeaderService } from 'src/app/services/alter-header.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signedInAdminName: string | null = "";

  public theme: string = "dark";

  public showHome: boolean = false;

  isNewUser: boolean = false;

  constructor(private _router: Router, private _alterService: AlterHeaderService, private _themeService: ThemeService) { 
    this._themeService.theme.subscribe(value => {
      this.theme = value;
      console.log(this.theme)
    });
    this._alterService.showHome.subscribe(value => this.showHome = value);
  }

  ngOnInit(): void {

    if(localStorage.getItem("someoneSignedIn") == 'true' && localStorage.getItem("adminSignedIn") !== null){
      console.log("Hello")
      this.signedInAdminName = localStorage.getItem("adminSignedIn");
      console.log(this.signedInAdminName)
    }


    let theme: string = localStorage.getItem("theme") as string;
    this.theme = theme;

    let url: string = this._router.url;
    if(!url.includes("home")){
      this._alterService.showHomeFunc(true);
    }else{
      this._alterService.showHomeFunc(false)
    }
  }

  newUserClick(){
    this.isNewUser = !this.isNewUser;
  }

  goToSignin(){
    this._router.navigate(["signin"])
  }

  goToRegister(){
    this._router.navigate(["register"])
  }

  simpleAlert(){

    Swal.fire("Hello World")

  }

  successAlert(){

    Swal.fire("Thank You",'You Submitted Successfully','success')

  }

}
