import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {HouseService} from '../../../../Services/house.service';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {User} from '../../../../model/user';
import {UserService} from '../../../../Services/user.service';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.scss']
})
export class ListHouseComponent implements OnInit {
  // listHouse: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  p = 1;
  listHouse: House[];
  nameHouse: string[];
  currentUser: User;

  constructor(private houseService: HouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.houseService.getList().subscribe(result => {
      this.listHouse = result;
    }, error => {
      console.log('Loi!');
    });

    this.authenticationService.currentUser.subscribe(value => {
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.currentUser = result;
      });
    });

  }

}
