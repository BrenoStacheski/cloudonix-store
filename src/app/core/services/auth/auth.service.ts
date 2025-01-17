import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ResponseBase, ResponseSignIn } from "../../models/auth/auth-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  signInWithAuthorizationKey(authorizationKey: string): Observable<ResponseBase<ResponseSignIn>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authorizationKey}`,
    });

    return this.http.get<ResponseBase<ResponseSignIn>>(`${this.API_URL}/items`, { headers });
  }
}
