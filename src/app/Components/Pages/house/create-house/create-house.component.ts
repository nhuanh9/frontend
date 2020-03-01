import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../../../Services/house.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {House} from '../../../../model/House';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../model/category';
import {CategoryService} from '../../../../Services/category.service';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.scss']
})
export class CreateHouseComponent implements OnInit {

  house: House;
  arrayPicture = '';
  createForm: FormGroup;
  listCategory: Category[];
  category: Category;

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryService: CategoryService,
  ) {
  }

  prepareForm() {
    this.createForm = this.fb.group({
      hostName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      // categoryRoom: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  getListCategory() {
    this.categoryService.getList().subscribe(next => {
      this.listCategory = next;
    });
  }

  ngOnInit() {
    this.prepareForm();
    this.getListCategory();
  }

  setCategoryForFormData() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listCategory.length; i++) {
      if (this.listCategory[i].id == this.createForm.get('category').value) {
        this.category = this.listCategory[i];
      }
    }
  }

  setData() {
    this.house = {
      name: this.createForm.get('name').value,
      category: this.category,
      address: this.createForm.get('address').value,
      imageUrls: this.arrayPicture,
      createDay: null,
      theMostNearEditDay: null
    };
  }

  returnHome() {
    this.router.navigate(['/']);
  }

  create(house) {
    this.houseService.create(house).subscribe(() => {
      alert('Thêm thành công!');
      this.returnHome();
    }, error1 => {
      console.log('Lỗi ' + error1);
      this.returnHome();
    });
  }

  createHouse() {
    this.setCategoryForFormData();
    this.setData();
    this.create(this.house);
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
