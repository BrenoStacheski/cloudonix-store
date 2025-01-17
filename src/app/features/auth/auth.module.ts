import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InlineSVGModule } from "ng-inline-svg-2";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule
  ]
})
export class AuthModule { }
