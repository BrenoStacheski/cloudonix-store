import { NgModule } from "@angular/core";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductsRoutingModule } from "./products-routing.module";
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from '@angular/material/divider';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { NgxMaskModule } from "ngx-mask";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ProductProfileEditorComponent } from './web-components/product-profile-editor/product-profile-editor.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    DeleteProductComponent,
    ProductProfileEditorComponent,
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    NgxMaskModule,
    CurrencyMaskModule,
    MatDividerModule
  ]
})
export class ProductsModule { }
