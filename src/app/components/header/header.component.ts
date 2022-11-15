import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { ThemeService } from 'src/app/services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public showLogout: boolean = false;

  public theme: string = "dark";

  public showHome: boolean = false;

  private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  public newDateTime = new Date();
  public hour: any;
  public minute: any;
  public seconds: any;
  public ampm: any;
  public day: any;
  public date: any;
  public month: any;
  public year: any;

  constructor(
      private _themeService: ThemeService, 
      private _alterService: AlterHeaderService,
      private _router: Router,
      private _route: ActivatedRoute
    ) {  
    this._themeService.theme.subscribe(value => this.theme = value);
    this._alterService.showHome.subscribe(value => this.showHome = value);
  }

  ngOnInit(): void {
    console.log(this.showLogout)
    
    if(localStorage.getItem("someoneSignedIn") == "true" && localStorage.getItem("adminSignedIn") !== null){
      this.showLogout = true;
    }


    this._alterService.showLogout.subscribe(val => {
      console.log(val);
      this.showLogout = val
    });

    // if(localStorage.getItem("adminSignedIn") !== null){
    //   this.showLogout = true;
    // }

    // theme
    let theme: string = localStorage.getItem("theme") as string;
    this.theme = theme;
    console.log(this.theme)

    // timer
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000)

    this.day = this.days[this.newDateTime.getDay()]
    this.date = this.newDateTime.getDate();
    this.month = this.newDateTime.getMonth();
    this.year = this.newDateTime.getFullYear();
    this.day = `${this.day}, ${this.date}/${this.month}/${this.year}`;
  }

  private updateDate(date: any){
    const hours = date.getHours();
    this.ampm = hours > 12 ? 'PM' : 'AM';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString(); 
    const seconds = date.getSeconds();
    this.seconds = seconds < 10 ? '0' + seconds : seconds.toString(); 
  }

  switchTheme(){
    this._themeService.switchTheme();
  }

  goToEmployees(){
    if(localStorage.getItem("someoneSignedIn") == "false"){
      alert("You need to sign-in to view the requested page")
      this._router.navigate(['signin'], {relativeTo: this._route})
    }else{
      this._router.navigate(['employees']);
    }
  }

  logout(){

    Swal.fire({
      title: 'Are you sure you want to logout?',
      showDenyButton: true,
      confirmButtonText: `Don't logout`,
      denyButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('You are still logged in', '', 'info')
      }
      else if (result.isDenied) {
        localStorage.removeItem("adminSignedIn");
        localStorage.setItem("someoneSignedIn", "false");
        this._router.navigate(['signin']);
        this._alterService.showLogoutFunc(false);
        Swal.fire({
          icon: 'success',
          title: 'Congrats...',
          text: 'You have successfully logged out!'
        })
    }
  })

    // Swal.fire({
    //   title: 'Are you sure you want to logout?',
    //   showCancelButton: true,
    //   confirmButtonText: 'Logout',
    //   cancelButtonText: `Don't logout`,
    // }).then((result) => {

    //   if (result.isConfirmed) { 
    
    //     localStorage.removeItem("adminSignedIn");
    //     localStorage.setItem("someoneSignedIn", "false");
    //     this._router.navigate(['signin']);
    //     this._alterService.showLogoutFunc(false);
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Congrats...',
    //       text: 'You have successfully logged out!'
    //     })
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire('You are still logged in', '', 'info')
    //   }
    // })





    // var result = confirm("Are you sure you want to logout of this profile ?");
    // if(result){
    //   localStorage.removeItem("adminSignedIn");
    //   localStorage.setItem("someoneSignedIn", "false");
    //   this._router.navigate(['signin']);
    //   this._alterService.showLogoutFunc(false);
    //   alert("You have been successfully logged out.")
    // }else{
    //   return;
    // }
    
  }

}
