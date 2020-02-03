import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../model/room';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  API_URL = environment.apiUrl + '/order';

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL);
  }
  //
  // detail(id: string): Observable<Room> {
  //   return this.http.get<Room>(this.API_URL + `/${id}`);
  // }
  //
  // edit(room: Room, id: string): Observable<Room> {
  //   return this.http.put<Room>(this.API_URL + `/${id}`, room);
  // }

  delete(id: string): Observable<Order> {
    return this.http.delete<Order>(this.API_URL + `/${id}`);
  }
}
