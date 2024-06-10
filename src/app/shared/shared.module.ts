import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ToastModule,
    TableModule,
    InputTextareaModule,
    DividerModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule
  ],
  exports: [
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
    TableModule,
    InputTextareaModule,
    DividerModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule
  ]
})
export class SharedModule { }
