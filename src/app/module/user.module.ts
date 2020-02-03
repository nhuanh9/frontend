
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateUserProfileComponent} from '../Components/Pages/users/update-user-profile/update-user-profile.component';

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
  },
  {
    path: 'update-profile/:id',
    component: UpdateUserProfileComponent
  }
];

@NgModule({
  declarations: [
    UpdateUserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class UserModule {
}
