import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {HouseService} from '../../../../Services/house.service';

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

  constructor(private houseService: HouseService) {
  }

  ngOnInit() {
    this.getListHouse();
  }

  getListHouse() {
    this.houseService.getList().subscribe(result => {
      this.listHouse = result;
    }, error => {
      console.log('Loi!');
    });
  }

}
