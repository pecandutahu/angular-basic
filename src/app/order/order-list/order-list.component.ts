import { Component, OnInit } from '@angular/core';
import { Order } from '@app/core/model/order';
import { OrderService } from '@app/core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit{
  orders: Order[] = [];
  filteredOrders: any[] = [];
  searchText: string = '';

  constructor(
    private orderService: OrderService
  ){}

  ngOnInit(): void {
      this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(output => {
      this.orders = output;
    }, error => {
      console.log(error);
    });
  }

  deleteOrder(orderId: number | undefined): void {
    if(confirm("Apakah anda yakin akan menghapus data ini?")) {
      this.orderService.deleteOrder(orderId).subscribe(output => {
        this.loadOrders();
      }, error =>{
        console.log(error);
      });
    }
  }

  
}
