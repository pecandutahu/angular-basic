import { Customer } from "./customer";
import { orderItem } from "./orderItem";

export class Order {
    orderId?: number;
    orderCode? : string;
    orderDate? : string;
    totalPrice? : string;
    customer? : Customer;
    orderItems? : orderItem[];

}