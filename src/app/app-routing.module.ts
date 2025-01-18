import { RouterModule, Routes } from "@angular/router";
import { STRING_EMPTY } from "../shared/constants/string-consts";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: STRING_EMPTY,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: STRING_EMPTY,
    loadChildren: () =>
      import('./features/products/products.module').then((m) => m.ProductsModule),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
