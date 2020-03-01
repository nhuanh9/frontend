import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../model/House';
import {Variant} from '../model/variant';

@Injectable({
  providedIn: 'root'
})
export class VariantService {
  API_URL = environment.apiUrl + 'variants';

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Variant[]> {
    return this.http.get<Variant[]>(this.API_URL);
  }

  create(variant): Observable<Variant> {
    return this.http.post<Variant>(this.API_URL, variant);
  }

  detail(id: string): Observable<Variant> {
    return this.http.get<Variant>(this.API_URL + `/${id}`);
  }

  edit(variant: Variant, id: string): Observable<Variant> {
    return this.http.put<Variant>(this.API_URL + `/${id}`, variant);
  }

  delete(id: string): Observable<Variant> {
    return this.http.delete<Variant>(this.API_URL + `/${id}`);
  }
}
