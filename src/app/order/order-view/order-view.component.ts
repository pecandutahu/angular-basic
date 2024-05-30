import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@app/core/model/order';
import { OrderService } from '@app/core/services/order.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent implements OnInit {
  orderId: number = 0;
  order: Order = {
    orderId: 0,
    orderCode : '',
    orderDate : '',
    totalPrice : '',
    customer : {},
    orderItems : [],
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getOrder(this.orderId);
  }

  getOrder(id: number): void {
    this.orderService.getOrder(id).subscribe(order => this.order = order);

  }
  
}
