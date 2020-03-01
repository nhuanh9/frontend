import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './Components/Blocks/menu/menu.component';
import {HeaderComponent} from './Components/Blocks/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListHouseComponent} from './Components/Pages/house/list-house/list-house.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgxPaginationModule} from 'ngx-pagination';
import {CreateHouseComponent} from './Components/Pages/house/create-house/create-house.component';
import {DetailHouseComponent} from './Components/Pages/house/detail-house/detail-house.component';
import {EditHouseComponent} from './Components/Pages/house/edit-house/edit-house.component';
import {CarouselComponent} from './Components/Blocks/carousel/carousel.component';
import {FooterComponent} from './Components/Blocks/footer/footer.component';
import { ListVersionComponent } from './Components/Pages/house/list-version/list-version.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    ListHouseComponent,
    CreateHouseComponent,
    DetailHouseComponent,
    EditHouseComponent,
    CarouselComponent,
    FooterComponent,
    ListVersionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
