import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-4">
          <pm-calendar-component></pm-calendar-component>
        </div>
        <div class="col-6"></div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'testCalendar';
}
