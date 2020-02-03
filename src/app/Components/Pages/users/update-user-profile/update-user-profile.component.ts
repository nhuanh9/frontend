import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../Services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../../../../model/user';
import {Subscription} from 'rxjs';
import {error} from 'util';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {
  currentUser: User;
  sub: Subscription;
  userFirstName = '';
  userLastName = '';
  userGender = '';
  userPhoneNumber = '';
  userEmail = '';

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }
  userForm: FormGroup = this.fb.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.userService.getUserProfile(id).subscribe(value => {
        this.currentUser = value;
        this.userFirstName = this.currentUser.firstName;
        this.userLastName = this.currentUser.lastName;
        this.userGender = this.currentUser.gender;
        this.userPhoneNumber = this.currentUser.phoneNumber;
        this.userEmail = this.currentUser.email;
        console.log('Thanh cong!');
      }, () => {
        console.log('Loi');
      });
    });
  }

  updateUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.userService.getUserProfile(id).subscribe(value => {
        this.currentUser = value;
        const user: User = {
          id: this.currentUser.id,
          firstName: this.userForm.get('firstName').value,
          lastName: this.userForm.get('lastName').value,
          gender: this.userForm.get('gender').value,
          phoneNumber: this.userForm.get('phoneNumber').value,
          email: this.userForm.get('email').value
        };
        if (user.firstName === '') {
          user.firstName = this.userFirstName;
        }
        if (user.lastName === '') {
          user.lastName = this.userLastName;
        }
        if (user.gender === '') {
          user.gender = this.userGender;
        }
        if (user.phoneNumber === '') {
          user.phoneNumber = this.userPhoneNumber;
        }
        if (user.email === '') {
          user.email = this.userEmail;
        }
        this.userService.updateUserProfile(this.currentUser.id, user).subscribe(() => {
          alert('Cap nhat thanh cong');
          this.router.navigate(['/']);
        }, ()  => {
          console.log('Loi');
        });
      });
    });
  }
}
