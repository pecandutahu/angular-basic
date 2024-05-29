import { Item } from "./item";

export class orderItem {
    orderItemId?: number;
    orderId?: number;
    item?: Item;
    quantity?: number;
    price?: number;
    subtotal?: number;
}