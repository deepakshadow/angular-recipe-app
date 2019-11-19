import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AuthComponent } from '../auth.component';




@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    FormsModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AuthModule { }
