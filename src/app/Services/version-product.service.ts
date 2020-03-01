import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/category';
import {VersionProduct} from '../model/versionProduct';
import {Variant} from '../model/variant';
import {Selection} from '../model/selection';

@Injectable({
  providedIn: 'root'
})
export class VersionProductService {
  API_URL = environment.apiUrl + 'version-products';

  constructor(private http: HttpClient) {
  }
  create(versionProduct): Observable<VersionProduct> {
    return this.http.post<VersionProduct>(this.API_URL, versionProduct);
  }

  getList(): Observable<VersionProduct[]> {
    return this.http.get<VersionProduct[]>(this.API_URL);
  }

  detail(id: string): Observable<VersionProduct> {
    return this.http.get<VersionProduct>(this.API_URL + `/${id}`);
  }

  edit(versionProduct: VersionProduct, id: string): Observable<VersionProduct> {
    return this.http.put<VersionProduct>(this.API_URL + `/${id}`, versionProduct);
  }

  delete(id: string): Observable<VersionProduct> {
    return this.http.delete<VersionProduct>(this.API_URL + `/${id}`);
  }
}
