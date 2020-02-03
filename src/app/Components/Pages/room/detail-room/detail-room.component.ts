import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../model/room';
import {RoomService} from '../../../../Services/room.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.scss']
})
export class DetailRoomComponent implements OnInit {

  room: Room;
  sub: Subscription;

  constructor(private roomService: RoomService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.roomService.detail(id).subscribe(next => {
        this.room = next;
      }, error1 => {
        console.log(error1);
      });
    });
  }

}
