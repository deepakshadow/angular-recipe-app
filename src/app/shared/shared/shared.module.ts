import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinLoaderComponent } from '../spin-loader/spin-loader.component';
import { DropdownDirective } from '../dropdown.directive';


@NgModule({
  declarations: [
    SpinLoaderComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinLoaderComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule { }
 