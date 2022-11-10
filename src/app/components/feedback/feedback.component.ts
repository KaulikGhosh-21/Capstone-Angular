import { Component, OnInit } from '@angular/core';


import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  public theme: string = "dark";

  name: string = "Kaulik";
  serviceLine!: string;
  location!: string;
  email!: string;
  feedback!: string;

  constructor(private _alterService: AlterHeaderService, private _router: Router, private _themeService: ThemeService) {
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
