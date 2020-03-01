import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {Subscription} from 'rxjs';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {VariantService} from '../../../../Services/variant.service';
import {Variant} from '../../../../model/variant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectionService} from '../../../../Services/selection.service';
import {Selection} from '../../../../model/selection';

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.scss']
})
export class DetailHouseComponent implements OnInit {

  house: House;
  sub: Subscription;
  variants: Variant[];
  variant: Variant;
  selections: Selection[];
  selection: Selection;
  addVariantForm: FormGroup;
  addSelectionForm: FormGroup;

  constructor(private houseService: HouseService,
              private variantService: VariantService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private selectionService: SelectionService
  ) {
  }

  getHouse() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  getVariantsOfHouse() {
    this.variantService.getList().subscribe(result => {
      this.variants = result;
    }, error => {
      console.log('Loi!');
    });
  }

  getSelectionsOfHouse() {
    this.selectionService.getList().subscribe(result => {
      this.selections = result;
    }, error => {
      console.log('Loi!');
    });
  }

  prepareForm() {
    this.addVariantForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.addSelectionForm = this.fb.group({
      selectionName: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getHouse();
    this.getVariantsOfHouse();
    this.getSelectionsOfHouse();
    this.prepareForm();
  }

  setVariantData() {
    this.variant = {
      name: this.addVariantForm.get('name').value,
      product: this.house
    };
  }


  addVariant() {
    this.setVariantData();
    this.variantService.create(this.variant).subscribe(() => {
      console.log('Thêm variant thành công');
      location.reload(true);
    }, error => {
      location.reload(true);
      console.log('Lỗi: ' + error);
    });
  }

  setSelectionData(variant) {
    this.selection = {
      name: this.addSelectionForm.get('selectionName').value,
      variant: variant
    };
  }

  countSelection(variant) {
    let dem = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selections.length; i++) {
      if (variant.id === this.selections[i].variant.id) {
        dem++;
      }
    }
    return dem;
  }

  addSelection(variant: Variant) {
    this.setSelectionData(variant);
    if (this.countSelection(variant) >= 3) {
      alert('Mỗi thuộc tính chỉ có 3 tuỳ chọn!');
      this.addSelectionForm.reset();
    } else {
      console.log(this.selection);
      this.selectionService.create(this.selection).subscribe(() => {
        console.log('Thêm selection thành công!');
        location.reload(true);
      }, error => {
        location.reload(true);
      });
    }

  }
}
