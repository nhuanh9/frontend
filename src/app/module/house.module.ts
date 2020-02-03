import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {DetailHouseComponent} from '../Components/Pages/house/detail-house/detail-house.component';
import {CreateHouseComponent} from '../Components/Pages/house/create-house/create-house.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditHouseComponent} from '../Components/Pages/house/edit-house/edit-house.component';
import {AddRoomComponent} from '../Components/Pages/room/add-room/add-room.component';

const routing: Routes = [
  {
    path: 'detail-house/:id',
    component: DetailHouseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-house',
    component: CreateHouseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-house/:id/create-room',
    component: AddRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-house/:id',
    component: EditHouseComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    DetailHouseComponent,
    CreateHouseComponent,
    AddRoomComponent,
    EditHouseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule
  ]
})
export class HouseModule {
}
