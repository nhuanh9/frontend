import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Variant} from '../model/variant';
import {Selection} from '../model/selection';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  API_URL = environment.apiUrl + 'selections';

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Selection[]> {
    return this.http.get<Selection[]>(this.API_URL);
  }

  create(selection): Observable<Selection> {
    return this.http.post<Selection>(this.API_URL, selection);
  }

  detail(id: string): Observable<Selection> {
    return this.http.get<Selection>(this.API_URL + `/${id}`);
  }

  edit(selection: Selection, id: string): Observable<Selection> {
    return this.http.put<Selection>(this.API_URL + `/${id}`, selection);
  }

  delete(id: string): Observable<Selection> {
    return this.http.delete<Selection>(this.API_URL + `/${id}`);
  }
}
