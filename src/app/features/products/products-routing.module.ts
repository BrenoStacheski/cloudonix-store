import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from "./components/products-list/products-list.component";

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    title: 'Cloudonix Store - Products'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
