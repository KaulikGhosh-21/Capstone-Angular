import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public theme: string = "dark";

  constructor(private _themeService: ThemeService, private _router: Router, private _alterService: AlterHeaderService) {
    this._themeService.theme.subscribe(value => this.theme = value);
   }

  ngOnInit(): void {
    let theme: string = localStorage.getItem("theme") as string;
    this.theme = theme;
    let url: string = this._router.url;
    if(!url.includes("home")){
      this._alterService.showHomeFunc(true);
    }else{
      this._alterService.showHomeFunc(false)
    }
  }

}
