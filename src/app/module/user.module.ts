
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'house',
    canActivate: [AuthGuard],
    loadChildren: () => import('./house.module').then(module => module.HouseModule)
  },
  {
    path: 'room',
    canActivate: [AuthGuard],
    loadChildren: () => import('./room.module').then(module => module.RoomModule)
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class UserModule {
}
