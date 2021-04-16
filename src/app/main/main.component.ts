import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  yen = 0;

  constructor() {}

  ngOnInit(): void {
  }
  dollar(): number {
    return this.yen / 105;
  }
}
