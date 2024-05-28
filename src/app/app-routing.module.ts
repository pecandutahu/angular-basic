import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListsComponent } from './customer/customer-lists/customer-lists.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';

const routes: Routes = [
  {path : "customer", component:CustomerListsComponent},
  {path : "customer/create", component:CustomerFormComponent},
  {path : "customer/:id/edit", component:CustomerEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
