import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public theme: string = 'dark';

  isNewUser: boolean = false;

  constructor(private _router: Router, private _route: ActivatedRoute, private _themeService: ThemeService) { 
    this._themeService.theme.subscribe(value => this.theme = value);
  }

  ngOnInit(): void {
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

}
