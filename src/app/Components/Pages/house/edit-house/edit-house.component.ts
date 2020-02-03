import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryHouse} from '../../../../model/categoryHouse';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {CategoryHouseService} from '../../../../Services/category-house.service';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';
import * as firebase from 'firebase';
import {RoomService} from '../../../../Services/room.service';
import {Subscription} from 'rxjs';
import {Room} from '../../../../model/room';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss']
})
export class EditHouseComponent implements OnInit {


  house: House;
  arrayPicture = '';
  editForm: FormGroup;
  sub: Subscription;
  rooms: Room[];
  idHouse: any;
  listCategoryHouse: CategoryHouse[];

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryHouse: CategoryHouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private activateRoute: ActivatedRoute,
              private  roomService: RoomService
  ) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
        this.idHouse = this.house.id;
      }, error1 => {
        console.log(error1);
      });
      this.roomService.getList().subscribe(next => {
        this.rooms = next;
        console.log(this.rooms);
      }, error => {
        console.log(error);
      });
    });
    this.editForm = this.fb.group({
      hostName: ['', [Validators.required]],
      nameHouse: ['', [Validators.required]],
      categoryHouse: ['', [Validators.required]],
      address: ['', [Validators.required]],
      amountBathRoom: ['', [Validators.required]],
      amountBedRoom: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.categoryHouse.getList().subscribe(next => {
      this.listCategoryHouse = next;
    });
  }

  transferFormData() {
    this.authenticationService.currentUser.subscribe(value => {
      this.house = {
        hostName: this.editForm.get('hostName').value,
        nameHouse: this.editForm.get('nameHouse').value,
        categoryHouse: {
          id: this.editForm.get('categoryHouse').value
        },
        amountBathRoom: this.editForm.get('amountBathRoom').value,
        amountBedRoom: this.editForm.get('amountBedRoom').value,
        address: this.editForm.get('address').value,
        description: this.editForm.get('description').value,
        imageUrls: this.arrayPicture
      };
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.house.hostName = result.username;
      });
    });
  }

  editHouse() {
    this.authenticationService.currentUser.subscribe(value => {
      this.userService.userDetail(value.id + '').subscribe(result => {
        const house: House = {
          hostName: this.editForm.get('hostName').value,
          nameHouse: this.editForm.get('nameHouse').value,
          categoryHouse: {
            id: this.editForm.get('categoryHouse').value
          },
          amountBathRoom: this.editForm.get('amountBathRoom').value,
          amountBedRoom: this.editForm.get('amountBedRoom').value,
          address: this.editForm.get('address').value,
          description: this.editForm.get('description').value,
          imageUrls: this.arrayPicture
        };
        this.houseService.edit(house, this.idHouse).subscribe(() => {
          alert('Sửa thành công!');
          this.router.navigate(['/']);
        }, error1 => {
          console.log('Lỗi ' + error1);
        });
      });
    });
  }

  saveImg(value) {
    const file = value.target.files;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.arrayPicture += downloadURL + ' ';
          console.log(this.arrayPicture);
        });
      }
    );
  }

}
