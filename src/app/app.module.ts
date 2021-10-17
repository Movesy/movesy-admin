import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { OrderslistComponent } from './orderslist/orderslist.component';
import { OrdersdataComponent } from './ordersdata/ordersdata.component';
import { OrdersmapComponent } from './ordersmap/ordersmap.component';
import { UserslistComponent } from './userslist/userslist.component';
import { UsercustomerdataComponent } from './usercustomerdata/usercustomerdata.component';
import { UsertransporterdataComponent } from './usertransporterdata/usertransporterdata.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderslistComponent,
    OrdersdataComponent,
    OrdersmapComponent,
    UserslistComponent,
    UsercustomerdataComponent,
    UsertransporterdataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'orders',
        component: OrderslistComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
