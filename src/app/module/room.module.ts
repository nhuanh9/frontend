import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {DetailRoomComponent} from '../Components/Pages/room/detail-room/detail-room.component';
import {AddRoomComponent} from '../Components/Pages/room/add-room/add-room.component';
import {EditRoomComponent} from '../Components/Pages/room/edit-room/edit-room.component';

const routing: Routes = [
  {
    path: 'detail-room/:id',
    component: DetailRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-room',
    component: AddRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-room/:id',
    component: EditRoomComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    DetailRoomComponent,
    AddRoomComponent,
    EditRoomComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule
  ]
})
export class RoomModule {
}
