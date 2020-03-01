import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {Subscription} from 'rxjs';
import {Variant} from '../../../../model/variant';
import {Selection} from '../../../../model/selection';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../../Services/house.service';
import {VariantService} from '../../../../Services/variant.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SelectionService} from '../../../../Services/selection.service';
import {VersionProduct} from '../../../../model/versionProduct';
import {VersionProductService} from '../../../../Services/version-product.service';

@Component({
  selector: 'app-list-version',
  templateUrl: './list-version.component.html',
  styleUrls: ['./list-version.component.scss']
})
export class ListVersionComponent implements OnInit {


  house: House;
  sub: Subscription;
  variants: Variant[];
  variant: Variant;
  selections: Selection[];
  selection: Selection;
  versions: VersionProduct[];
  version: VersionProduct;

  constructor(private houseService: HouseService,
              private variantService: VariantService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private selectionService: SelectionService,
              private versionProductService: VersionProductService
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

  getVersionsOfHouse() {
    this.versionProductService.getList().subscribe(result => {
      this.versions = result;
    }, error => {
      console.log('Loi!');
    });
  }

  ngOnInit() {
    this.getHouse();
    this.getVariantsOfHouse();
    this.getSelectionsOfHouse();
    this.getVersionsOfHouse();
  }

  getSelectionOnAVariant(id) {
    // tslint:disable-next-line:prefer-const
    let selections = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selections.length; i++) {
      if (id === this.selections[i].variant.id) {
        selections.push(this.selections[i]);
      }
    }
    return selections;
  }

  getSelectedVersion() {
    let version = this.house.name;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.variants.length; i++) {
      if (this.variants[i].product.id == this.house.id) {
        const e = (document.getElementById('variant' + this.variants[i].id)) as HTMLSelectElement;
        version += '| ' + e.options[e.selectedIndex].value;
      }
    }
    return version;
  }

  setVersionData(version) {
    this.version = {
      name: version,
      productId: this.house.id
    };
  }

  checkVersion(version) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.versions.length; i++) {
      if (this.versions[i].name == version) {
        return false;
      }
    }
    return true;
  }

  returnListVersion() {
    location.reload();
  }

  add(version) {
    this.setVersionData(version);
    this.versionProductService.create(this.version).subscribe(() => {
      alert('Thêm thành công!');
      this.returnListVersion();
    }, error => {
      console.log(error);
      alert('Thêm thành công!');
      this.returnListVersion();
    });

  }

  addVersion() {
    const version = this.getSelectedVersion();
    console.log(version);
    if (this.checkVersion(version)) {
      this.add(version);
    } else {
      alert(' Phiên bản đã tồn tại!');
    }
  }
}
