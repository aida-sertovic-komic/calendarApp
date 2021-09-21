import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'pm-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css'],
})
export class CalendarComponentComponent implements OnInit {
  value: Date | any;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.calendarChange.emit(this.value);
  }

  selectedDate(item: Date) {
    this.calendarService.emitCalendarChangeEvent(item);
  }
}
