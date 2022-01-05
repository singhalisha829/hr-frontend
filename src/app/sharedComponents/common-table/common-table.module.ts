import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTableComponent } from './common-table.component';
import { FormsModule } from '@angular/forms';
import { DropDownModule } from '../dropDown/dropdown.module';



@NgModule({
  declarations: [
    CommonTableComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DropDownModule
  ],
  exports: [CommonTableComponent]
})
export class CommonTableModule { }
