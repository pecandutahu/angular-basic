import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '@app/core/model/customer';
import { Item } from '@app/core/model/item';
import { CustomerService } from '@app/core/services/customer.service';
import { ItemService } from '@app/core/services/item.service';
import { OrderService } from '@app/core/services/order.service';
import { error } from 'console';
import { first } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit{
  orderForm: FormGroup;
  items: Item[] = [];
  customers: Customer[] = [];
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private itemService: ItemService,
    private customerService: CustomerService
  ) {
    this.orderForm = this.fb.group({
      orderCode: ['', Validators.required],
      customer: this.fb.group({
        customerId: ['', Validators.required]
      }),
      orderItems : this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
    this.customerService.getCustomers().subscribe(output => this.customers = output);
  }

  get itemsArray(): FormArray {
    return this.orderForm.get('orderItems') as FormArray;
  }

  addItem(): void {
    const itemFormGroup = this.fb.group({
      item: this.fb.group({
        itemsId: ['', Validators.required]
      }),
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [{ value: 0, disabled: true }]
    });

    itemFormGroup.get('item')?.get('itemsId')?.valueChanges.subscribe(itemId => {
      if (itemId && isNumber(itemId)) {
        const selectedItem = this.items.find(item => item.itemsId === itemId);
        let price = selectedItem? selectedItem.price : 0;

        if(price && isNumber(price)) {
          itemFormGroup.get('price')?.setValue(price);
        }
      }
    });

    this.itemsArray.push(itemFormGroup);

    function isNumber(value: any): value is number {
      return typeof value === 'number';
    }

  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  calculateTotalPrice(): number {
    return this.itemsArray.controls.reduce((total, control) => {
      const quantity = control.get('quantity')? control.get('quantity')?.value : 0;

      const price = control.get('price')? control.get('price')?.value : 0;

      return total + (quantity * price);
    }, 0);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order = this.orderForm.getRawValue();
      order.totalPrice = this.calculateTotalPrice();
      console.log('Order submitted:', order);
      this.orderService
      .createOrder(order)
      .pipe(first())
      .subscribe({
        next: () =>{
          this.router.navigate(['/order'], {

          })
        }, error: (error) => {
          this.error = error;
          this.loading = false;
        }
      })
    }else{
      this.error = 'Please fill out all required fields';
    }

  }
  

}
