import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ProductsModel } from "../../models/products/product-model";
import { TokenMethodsUtils } from "../../../../shared/utils/token-methods";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  signInWithAuthorizationKey(authorizationKey: string): Observable<ProductsModel[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authorizationKey}`,
    });

    return this.http.get<ProductsModel[]>(`${this.API_URL}/items`, { headers });
  }

  get authenticated(): boolean {
    return TokenMethodsUtils.getToken() ? true : false;
  }
}
