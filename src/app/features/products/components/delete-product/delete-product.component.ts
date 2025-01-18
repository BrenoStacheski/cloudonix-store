import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsModel } from '../../../../core/models/products/product-model';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      product: ProductsModel
    },
    private dialogRef: MatDialogRef<ProductsListComponent>,
  ) { }

  cancelExclusion(): void {
    this.dialogRef.close();
  }

  deleteProduct(): void {
    this.dialogRef.close(true);
  }
}
