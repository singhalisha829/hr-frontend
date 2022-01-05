import { NgModule, ModuleWithProviders } from '@angular/core';
import { DropDownComponent } from './dropdown.component';

import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
  ],
  declarations: [
    DropDownComponent
  ],
  exports: [DropDownComponent,TabsModule]
})
export class DropDownModule {
}
