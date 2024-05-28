import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListsComponent } from './customer/customer-lists/customer-lists.component';

const routes: Routes = [
  {path : "customer", component:CustomerListsComponent},
  {path : "customer/create", component:CustomerFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
