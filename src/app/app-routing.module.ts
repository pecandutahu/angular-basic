import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListsComponent } from './customer/customer-lists/customer-lists.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderFormComponent } from './order/order-form/order-form.component';

const routes: Routes = [
  {path : "customer", component:CustomerListsComponent},
  {path : "customer/create", component:CustomerFormComponent},
  {path : "customer/:id/edit", component:CustomerEditComponent},
  {path : "item", component:ItemListComponent},
  {path : "item/create", component:ItemCreateComponent},
  {path : "item/:id/edit", component:ItemEditComponent},
  {path : "order", component:OrderListComponent},
  {path : "order/create", component:OrderFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
