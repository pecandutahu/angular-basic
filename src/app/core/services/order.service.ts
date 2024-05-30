import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environtment/environment';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderSubject: BehaviorSubject<Order | null>;
  public order: Observable<Order | null >;

  constructor(private router: Router, private http:HttpClient) {
    this.orderSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('order')!)
    )
    this.order = this.orderSubject.asObservable();
  }

  public get orderValue() {
    return this.orderSubject.value;
  }

  createOrder(order: Order) {
    return this.http.post(
      `${environment.apiUrl}/order/create`,
      order
    )
  }

  getOrders() {
    return this.http.get<Order[]>(`${environment.apiUrl}/order/lists`)
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/order/lists/${id}`);
  }

  deleteOrder(id:number | undefined): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/order/delete/${id}`);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.apiUrl}/order/update/${order.orderId}`, order);
  }

  downloadReport(): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http.get<Blob>(`${environment.apiUrl}/order/downloadReport`, options);
  }
}
