import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarService } from '../calendar.service';
import getDate from 'date-fns/getDate';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import { DatePipe } from '@angular/common';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

// import setDate from 'date-fns/setDate';

@Component({
  selector: 'pm-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.css'],
})
export class WeekCalendarComponent implements OnInit {
  private _jsonURL = 'assets/data.json';
  listData: any = [];
  date: Date | any;
  item: Date | any; // selected date
  subscription: any;
  currentDate: Date = new Date();
  listDate: any = [];
  events: [] | undefined;
  hours: any = [];
  firstDay: Date | any;
  lastDay: Date | any;
  value: Date | any;

  constructor(
    private http: HttpClient,
    private calendarService: CalendarService
  ) {
    // fetch data from JSON file
    this.getJSON().subscribe((data) => {
      this.listData= data.data.appointments.nodes;
      console.log(this.listData)
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit(): void {
    this.getDate(this.currentDate);
    this.subscription = this.calendarService
      .getCalendarChangeEmitter()
      .subscribe((item) => this.selectedDate(item));
      
  }

  selectedDate(item: Date) {
    this.item = item;
    this.getDate(item);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getDate(item: Date) {
    this.firstDay = startOfWeek(item);
    this.lastDay = endOfWeek(item);
    let date = this.firstDay.getDate();
    this.listDate =  eachDayOfInterval({
      start: this.firstDay,
      end: this.lastDay
    });
    console.log(this.listDate)
    this.gethours();
    // this.listDate = [];
    // let arrayOfWeekdays = [
    //   'Sun',
    //   'Mon',
    //   'Tue',
    //   'Wed',
    //   'Thu',
    //   'Fri',
    //   'Sat',
    //   'Sun',
    //   'Mon',
    //   'Tue',
    //   'Wed',
    //   'Thu',
    //   'Fri',
    //   'Sat',
    // ];
    // let weekdayNumber = this.firstDay.getDay();
    // let weekdayName;
    // weekdayName = arrayOfWeekdays[weekdayNumber];
    // for (let i =0; i < 7; i++) {
    //   this.listDate.push({
    //     date: date,
    //     weekdayName: weekdayName,
    //     events: this.gethours(this.hours),
    //   });
    //   date += 1;
    //   weekdayNumber += 1;
    //   weekdayName = arrayOfWeekdays[weekdayNumber];
    // }
  }
  checkDate(date: any,item: any, hour: number){
    if(new Date(date).getDate() === new Date(item).getDate()) {
      if(new Date(date).getHours() === hour){
        return true;
      }
     else return false;
    }
    else return false;
  }

  gethours() {
    // let datum = setDate(this.item, date);
    this.hours = [];
    for (let i = 8; i < 21; i++) {
      this.hours.push(i);
    }
  }
}
