import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@app/core/model/customer';
import { CustomerService } from '@app/core/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit{
  customerId : number = 0;
  
  customer: Customer = {
    customerId: 0,
    customerName: '',
    customerAddress: '',
    customerCode: '',
    customerPhone: '',
    pic: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService:CustomerService) { }
  
  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.getCustomer(this.customerId);
  }

  getCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe(customer => this.customer = customer);
  }

  onSubmit(): void {
    this.customerService.updateCustomer(this.customer).subscribe(() => {
      this.router.navigate(['/customer']);
    }, error => {
      console.log(error);
    });
  }
}
