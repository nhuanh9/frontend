import {Component, OnInit} from '@angular/core';
import {House} from '../../../model/House';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../Services/house.service';
import {Router} from '@angular/router';
import {UserToken} from '../../../model/user-token';
import {AuthenticationService} from '../../../Services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser: UserToken;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

  login() {
  }

  register() {

  }

  search() {

  }
}
