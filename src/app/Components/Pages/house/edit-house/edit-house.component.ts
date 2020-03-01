import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../model/category';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {CategoryService} from '../../../../Services/category.service';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs';


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
  idHouse: any;
  listCategory: Category[];
  category: Category;

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryService: CategoryService,
              private activateRoute: ActivatedRoute,
  ) {
  }

  getHouse() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
        this.idHouse = this.house.id;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  prepareForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  getListCategory() {
    this.categoryService.getList().subscribe(next => {
      this.listCategory = next;
    });
  }

  ngOnInit() {
    this.getHouse();
    this.prepareForm();
    this.getListCategory();
  }

  getModelCategoryForForm() {
    if (this.editForm.get('category').value != null) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listCategory.length; i++) {
        if (this.listCategory[i].id == this.editForm.get('category').value) {
          this.category = this.listCategory[i];
        }
      }
    }
  }

  transformData(): House {
    const house: House = {
      name: this.editForm.get('name').value,
      category: this.category,
      address: this.editForm.get('address').value,
      imageUrls: this.arrayPicture,
      createDay: null,
      theMostNearEditDay: null
    };
    return house;
  }

  checkAndFixNullData(house) {
    if (house.name === '') {
      house.name = this.house.name;
    }
    if (house.address === '') {
      house.address = this.house.address;
    }
    if (house.category == null) {
      house.category = this.house.category;
    }
    if (house.imageUrls === '') {
      house.imageUrls = this.house.imageUrls;
    }
  }
  edit(house){
    this.houseService.edit(house, this.idHouse).subscribe(() => {
      alert('Sửa thành công!');
      this.router.navigate(['/']);
    }, error1 => {
      this.router.navigate(['/']);
      console.log('Lỗi ' + error1);
    });
  }
  editHouse() {
    this.getModelCategoryForForm();
    const house: House = this.transformData();
    this.checkAndFixNullData(house);
    this.edit(house);
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
