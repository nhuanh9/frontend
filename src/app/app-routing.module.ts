import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListHouseComponent} from './Components/Pages/house/list-house/list-house.component';
import {CreateHouseComponent} from './Components/Pages/house/create-house/create-house.component';
import {EditHouseComponent} from './Components/Pages/house/edit-house/edit-house.component';
import {DetailHouseComponent} from './Components/Pages/house/detail-house/detail-house.component';
import {ListVersionComponent} from './Components/Pages/house/list-version/list-version.component';

const routes: Routes = [
  {
    path: '',
    component: ListHouseComponent
  },
  {
    path: 'create-house',
    component: CreateHouseComponent
  },
  {
    path: 'edit-house/:id',
    component: EditHouseComponent
  },
  {
    path: 'detail-house/:id',
    component: DetailHouseComponent
  },
  {
    path: 'list-version/:id',
    component: ListVersionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
