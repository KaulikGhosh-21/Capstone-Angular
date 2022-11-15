import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { BannerService } from 'src/app/services/banner.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public isSomeoneSignedin: boolean = false;

  public showBanner: boolean = false;

  public theme!: string;

  constructor(
      private _themeService: ThemeService, 
      private _router: Router, 
      private _bannerService: BannerService,
      private _alterService: AlterHeaderService  
    ) { 
    this._themeService.theme.subscribe(value => this.theme = value);
  }

  ngOnInit(): void {

    console.log("Hello from main");

    if(localStorage.getItem("someoneSignedIn") == "true" && localStorage.getItem("adminSignedIn") !== null){
      this._alterService.showLogoutFunc(true);
    }

    this._bannerService.showBanner.subscribe(val => this.showBanner = val);

    if(this._router.url.includes('employees') && (localStorage.getItem("someoneSignedIn") == "false")){
      alert("You need to signin to view this page");
      this._router.navigate(['signin']);
    }else{
      if(localStorage.getItem("adminSignedIn") !== null){
        localStorage.setItem("someoneSignedIn", String(true));
      }else{
        localStorage.setItem("someoneSignedIn", String(this.isSomeoneSignedin));
      };
    }
    
  }

}
