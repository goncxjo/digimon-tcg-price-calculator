import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  CommonModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
]

const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  imports: MODULES,
  exports: [
    MODULES,
    ...PUBLIC_COMPONENTS
  ],
  providers: [DatePipe]
})
export class SharedModule { }
