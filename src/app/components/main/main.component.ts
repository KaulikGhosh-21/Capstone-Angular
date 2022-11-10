import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public theme!: string;

  constructor(private _themeService: ThemeService) { 
    this._themeService.theme.subscribe(value => this.theme = value);
  }

  ngOnInit(): void {
  }

}
