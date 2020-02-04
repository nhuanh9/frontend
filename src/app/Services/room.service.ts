import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../model/House';
import {Room} from '../model/room';
import {Order} from '../model/order';
import {CommentToRoom} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  API_URL = environment.apiUrl + '/room';

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Room[]> {
    return this.http.get<Room[]>(this.API_URL);
  }

  detail(id: string): Observable<Room> {
    return this.http.get<Room>(this.API_URL + `/${id}`);
  }

  edit(room: Room, id: string): Observable<Room> {
    return this.http.put<Room>(this.API_URL + `/${id}`, room);
  }

  delete(id: string): Observable<Room> {
    return this.http.delete<Room>(this.API_URL + `/${id}`);
  }

  createOrder(idRoom, order): Observable<Order> {
    return this.http.post<Order>(this.API_URL + `/${idRoom}/order`, order);
  }

  addComment(idRoom, comment): Observable<CommentToRoom> {
    return this.http.post<CommentToRoom>(this.API_URL + `/${idRoom}/comments`, comment);
  }
}
