import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {Subscription} from 'rxjs';
import {User} from '../../../../model/user';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';
import {Order} from '../../../../model/order';
import {OrderService} from '../../../../Services/order.service';

@Component({
  selector: 'app-your-orders',
  templateUrl: './your-orders.component.html',
  styleUrls: ['./your-orders.component.scss']
})
export class YourOrdersComponent implements OnInit {

  orders: Order[];
  sub: Subscription;
  currentUser: User;

  constructor(private houseService: HouseService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(value => {
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.currentUser = result;
        this.orders = this.currentUser.listOrder;
      });
    });
  }

  deleteOrder(order) {
    this.authenticationService.currentUser.subscribe(value => {
      const id = order.id;
      this.orderService.delete(id).subscribe(() => {
        alert('Thanh Cong!');
        location.reload();
      }, error => {
        alert('Thanh Cong!');
        console.log('Loi! ' + error);
        location.reload();
      });
    });
  }
}
