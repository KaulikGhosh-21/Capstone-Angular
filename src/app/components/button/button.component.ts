import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Output() buttonClick = new EventEmitter();
  @Input() text!: string;
  @Input() typeGot!: string;

  constructor() { }

  ngOnInit(): void {}

  onClick(){
    this.buttonClick.emit();
  }

}
