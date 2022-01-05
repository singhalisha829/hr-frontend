import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRangeDatePickerComponent } from './custom-range-date-picker.component';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [CustomRangeDatePickerComponent],
  imports: [CommonModule, FormsModule, 
    NgxDaterangepickerMd.forRoot({
      format: 'DD/MM/YYYY', // could be 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
      displayFormat: 'DD/MM/YYYY', // default is format value
    }),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  exports: [CustomRangeDatePickerComponent]
})
export class CustomDateRangePickerModule { }