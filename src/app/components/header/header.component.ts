import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { AlterHeaderService } from 'src/app/services/alter-header.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  constructor(private _themeService: ThemeService, private _alterService: AlterHeaderService) {  
    this._themeService.theme.subscribe(value => this.theme = value);
    this._alterService.showHome.subscribe(value => this.showHome = value);
  }

  ngOnInit(): void {
    let theme: string = localStorage.getItem("theme") as string;
    this.theme = theme;
    console.log(this.theme)
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

}
