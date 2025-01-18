import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InlineSVGModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
