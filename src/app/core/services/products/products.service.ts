import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ProductsModel } from "../../models/products/product-model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductsModel[]> {
    return this.http.get<ProductsModel[]>(`${this.API_URL}/items`);
  }

  createProduct(productDto: ProductsModel): Observable<ProductsModel> {
    return this.http.post<ProductsModel>(`${this.API_URL}/items`, productDto);
  }

  updateProduct(productId: number, productProperty: Object): Observable<ProductsModel> {
    return this.http.patch<ProductsModel>(`${this.API_URL}/items/${productId}`, productProperty);
  }

  deleteProduct(productId: number): Observable<null> {
    return this.http.delete<null>(`${this.API_URL}/items/${productId}`);
  }

}
