import { RouterModule, Routes } from "@angular/router";
import { STRING_EMPTY } from "../../../shared/constants/string-consts";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: STRING_EMPTY,
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Cloudonix Store - Login'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
