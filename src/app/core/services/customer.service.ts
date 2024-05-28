import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environtment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerSubject: BehaviorSubject<Customer | null>;
  public customer: Observable<Customer | null>;

  constructor( private router: Router, private http: HttpClient) {
    this.customerSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem("customer")!)
    )
    this.customer = this.customerSubject.asObservable();
  }

  public get customerValue() {
    return this.customerSubject.value;
  }

   createCustomer(customer:Customer) {
    return this.http.post(
      `${environment.apiUrl}/customer/create`, 
      customer
    )
   }

   getCustomers() {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customer/lists`);
   }

   deleteCustomer(customerId:number | undefined) : Observable<any> {
    return this.http.delete(`${environment.apiUrl}/customer/delete/${customerId}`);
   }



} 
