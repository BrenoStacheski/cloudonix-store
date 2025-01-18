import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ProductsModel } from '../../../../core/models/products/product-model';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  dollarCurrencyFormat: Object = {
    prefix: 'U$',
    thousands: '.',
    decimal: ',',
    align: 'left'
  };
  products: ProductsModel[] = [];
  displayedColumns: string[] = ['id', 'sku', 'name', 'cost', 'actions'];

  productForm!: FormGroup;
  selectedProduct!: ProductsModel;
  createProduct: boolean = false;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.fetchProductsFromStorage();
  }

  initProductForm(): void {
    this.productForm = this.formBuilder.group({
      name: [null],
      description: [null],
      sku: [null],
      cost: [null],
      profile: this.formBuilder.group({
        type: [null],
        available: [null],
        backlog: [null],
      })
    })
  }

  fetchProductsFromStorage(): void {
    const productsJson = localStorage.getItem('@products');
    if (productsJson) {
      this.products = JSON.parse(productsJson);
    } else {
      this.fetchProducts();
    }
  }

  fetchProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: () => {
        const options: SweetAlertOptions = {
          html: `
                <span style="display: flex; height: 60px; align-items: center; align-content: center;">
                  <p class="swal-expirated-token">
                    It was not possible to fetch products due to an error with the server, please try again later.
                  </p>
                </span>
                `,
          toast: false,
          position: 'center',
          showConfirmButton: true,
          timerProgressBar: true,
        };
        Swal.fire(options);
      }
    })
  }

  showProductDetails(row: ProductsModel): void {
    this.createProduct = false;
    this.selectedProduct = row;
    this.changeDetector.detectChanges();
  }

  editProduct(product: ProductsModel): void {

  }

  openDeletionDialog(product: ProductsModel): void {
    this.selectedProduct = product;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '20vh';
    dialogConfig.width = '30vw';
    dialogConfig.data = {
      product: product
    }
    this.dialog.open(DeleteProductComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.deleteProduct();
      }
    });
  }

  deleteProduct(): void {
    this.productsService.deleteProduct(this.selectedProduct.id).subscribe({
      next: () => {
        const options: SweetAlertOptions = {
          html: `
            <span style="display: flex; height: 60px; align-items: center; justify-content: center;">
              <p class="swal-expirated-token" style="font-weight: bold;">
                ${`Product ${this.selectedProduct.name} successfully deleted!`}
              </p>
            </span>
          `,
          toast: false,
          position: 'center',
          showConfirmButton: true,
          timerProgressBar: true,
        };

        Swal.fire(options);
      }
    })
      .add(() => {
        this.fetchProducts();
        this.changeDetector.detectChanges();
      })
  }

  newProduct(): void {
    this.createProduct = true;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }
}
