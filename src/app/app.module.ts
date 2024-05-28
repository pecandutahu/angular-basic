import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerListsComponent } from './customer/customer-lists/customer-lists.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    CustomerListsComponent,
    CustomerEditComponent,
    ItemCreateComponent,
    ItemListComponent,
    ItemEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
