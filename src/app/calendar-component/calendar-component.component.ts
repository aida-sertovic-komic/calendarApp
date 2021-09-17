import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css']
})
export class CalendarComponentComponent implements OnInit {
  value: Date | undefined;

  // constructor() { }

  ngOnInit(): void {
  }

}
