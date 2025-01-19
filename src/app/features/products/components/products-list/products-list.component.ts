import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ProductsModel } from '../../../../core/models/products/product-model';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../web-components/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  product: Product = {
    profile: {
      type: 'furniture',
      available: true,
      backlog: null,
    },
  };

  dollarCurrencyFormat: Object = {
    prefix: 'U$',
    thousands: '.',
    decimal: ',',
    align: 'left'
  };
  products: ProductsModel[] = [];
  displayedColumns: string[] = ['id', 'sku', 'name', 'cost', 'actions'];

  productForm!: FormGroup;
  selectedProduct!: ProductsModel | null;
  isLoading: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.fetchProducts();
  }

  initProductForm(): void {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      sku: [null, Validators.required],
      cost: [null, Validators.required],
      profile: this.formBuilder.group({
        type: [null],
        available: [null],
        backlog: [null],
        customProperties: this.formBuilder.group({})
      })
    });
  }

  private getChangedProperties(): { [key: string]: any } {
    const changedProperties: { [key: string]: any } = {};

    Object.keys(this.productForm.controls).forEach((name) => {
      const currentControl = this.productForm.get(name);

      if (currentControl?.dirty) {
        changedProperties[name] = currentControl.value;
      }
    });

    return changedProperties;
  }

  fetchProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: () => {
        const options: SweetAlertOptions = {
          html: `
                <span>
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
      .add(() => this.changeDetector.detectChanges())
  }

  showProductDetails(row: ProductsModel): void {
    this.isUpdating = true;
    this.productForm.controls['sku'].disable();
    this.selectedProduct = row;
    this.populateProductForm(row);
    this.changeDetector.detectChanges();
  }

  populateProductForm(product: ProductsModel): void {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      sku: product.sku,
      cost: product.cost,
      profile: product.profile
    });
  }

  customPropertiesKeys(): string[] {
    const customPropertiesGroup = this.productForm.get('profile.customProperties') as FormGroup;
    return Object.keys(customPropertiesGroup.controls);
  }

  createProduct(): void {
    this.isLoading = true;
    this.productsService.createProduct(this.productForm.value).subscribe({
      next: () => {
        const options: SweetAlertOptions = {
          html: `
            <span>
              <p class="swal-expirated-token" style="font-weight: bold;">
                ${`Product ${this.productForm.value.name} successfully created!`}
              </p>
            </span>
          `,
          toast: false,
          position: 'center',
          showConfirmButton: true,
          timerProgressBar: true,
        };

        Swal.fire(options);
      },
      error: () => this.displayErrorOnRequest(),
    })
      .add(() => {
        this.isLoading = false;
        this.fetchProducts();
        this.changeDetector.detectChanges();
      })
  }

  updateProduct(): void {
    console.log('getChangedProperties', this.getChangedProperties())
    this.isLoading = true;
    this.productsService.updateProduct(this.selectedProduct!.id, this.productForm.value).subscribe({
      next: () => {
        const options: SweetAlertOptions = {
          html: `
            <span>
              <p class="swal-expirated-token" style="font-weight: bold;">
                ${`Product ${this.selectedProduct?.name} successfully updated!`}
              </p>
            </span>
          `,
          toast: false,
          position: 'center',
          showConfirmButton: true,
          timerProgressBar: true,
        };

        Swal.fire(options);
      },
      error: () => this.displayErrorOnRequest(),
    })
      .add(() => {
        this.isLoading = false;
        this.fetchProducts();
        this.changeDetector.detectChanges();
      })
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
    this.productsService.deleteProduct(this.selectedProduct!.id).subscribe({
      next: () => {
        const options: SweetAlertOptions = {
          html: `
            <span>
              <p class="swal-expirated-token" style="font-weight: bold;">
                ${`Product ${this.selectedProduct?.name} successfully deleted!`}
              </p>
            </span>
          `,
          toast: false,
          position: 'center',
          showConfirmButton: true,
          timerProgressBar: true,
        };

        Swal.fire(options);
      },
      error: () => this.displayErrorOnRequest(),
    })
      .add(() => {
        this.fetchProducts();
        this.changeDetector.detectChanges();
      })
  }

  saveChanges(): void {
    if (this.productForm.invalid) {
      const options: SweetAlertOptions = {
        html: `
                <span>
                  <p class="swal-expirated-token">
                    Please, fill required fields.
                  </p>
                </span>
                `,
        toast: false,
        position: 'center',
        showConfirmButton: true,
        timerProgressBar: true,
      };
      Swal.fire(options);
      return;
    }
    if (this.isUpdating) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  displayErrorOnRequest(): void {
    const options: SweetAlertOptions = {
      html: `
          <span>
            <p class="swal-expirated-token">
              It was not possible to process your request due to an error with the server, please try again later.
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

  newProduct(): void {
    this.isUpdating = false;
    this.selectedProduct = null;
    this.productForm.controls['sku'].enable();
    this.productForm.reset();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  updateProductProfile(updatedProfile: Product['profile']) {
    this.product.profile = updatedProfile;

    const customPropertiesGroup = this.productForm.get('profile.customProperties') as FormGroup;

    Object.keys(customPropertiesGroup.controls).forEach((key) => {
      customPropertiesGroup.removeControl(key);
    });

    if (updatedProfile.customProperties) {
      Object.entries(updatedProfile.customProperties).forEach(([key, value]) => {
        customPropertiesGroup.addControl(key, this.formBuilder.control(value));
      });
    }

    this.productForm.patchValue({
      profile: {
        ...updatedProfile,
        customProperties: undefined
      }
    });
  }

}
