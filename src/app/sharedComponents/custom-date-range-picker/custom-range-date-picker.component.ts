import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-custom-dateRangePicker',
  template: `
  <input *ngIf="!singleCalendar" type="text"
  class="form-control"
  readonly
  ngxDaterangepickerMd
  [(ngModel)]="_selectedDateRange"
  [showDropdowns]="true"
  [showCustomRangeLabel]="true"
  [alwaysShowCalendars]="true"
  [ranges]="ranges"
  [isInvalidDate] = "isInvalidDate"
  [showCancel]="true"
  [showClearButton]="true"
  (datesUpdated)="onDatesUpdated()"
  placeholder="Select Date..."/>

  <input *ngIf="singleCalendar" type="text"
  class="form-control"
  readonly
  ngxDaterangepickerMd
  [(ngModel)]="_selectedDateRange"
  [singleDatePicker]="true"
  [isInvalidDate] = "isInvalidDate"
  (datesUpdated)="onDatesUpdated()"
  [minDate]="minimumDate"
  placeholder="Select Date..."/>


  `
})
export class CustomRangeDatePickerComponent implements OnInit {
  _selectedDateRange: { startDate: moment.Moment; endDate: moment.Moment; } | undefined
  @Output() onDateRangeSelection = new EventEmitter()
  @Input() public set selectedDateRange(data: { start_date: string | number | Date; end_date: string | number | Date; }) {
    if (data)
    this._selectedDateRange = {startDate: moment(new Date(data.start_date)), endDate: moment(new Date(data.end_date))}
  }
  @Input() public set resetCalendar(data: any) {
    if (data) this._selectedDateRange = undefined;
  }
  @Input() singleCalendar = false;
  @Input() public set minDate(data: string | number | Date) {
    if(data) {
      this.minimumDate = moment(new Date(data));
    }
  }
  alwaysShowCalendars!: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 3 Months': [moment().subtract(3, 'month').startOf('month')],
    'Last 6 Months': [moment().subtract(6, 'month').startOf('month')],
    'Last 1 Year': [moment().subtract(12, 'month').startOf('month')]
  }
  invalidDates: moment.Moment[] = [];
  minimumDate!: moment.Moment;

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  onDatesUpdated() {
    if (this._selectedDateRange)
    this.onDateRangeSelection.emit(JSON.parse(JSON.stringify(this._selectedDateRange)))
  }

  constructor() { }

  ngOnInit() { }
}
