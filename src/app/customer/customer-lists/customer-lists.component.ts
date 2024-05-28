import { Component } from '@angular/core';
import { Customer } from '@app/core/model/customer';
import { CustomerService } from '@app/core/services/customer.service';
import { error } from 'console';

@Component({
  selector: 'app-customer-lists',
  templateUrl: './customer-lists.component.html',
  styleUrl: './customer-lists.component.css'
})
export class CustomerListsComponent {
  customers: Customer[] = [];
  filteredCustomers: any[] = [];
  searchText: string = '';

  constructor(private customerService:CustomerService) {
    
  }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(output => {
      this.customers = output;
      this.filteredCustomers = output;
    },error=>{
      console.log(error)
    });
  }

  deleteCustomer(customerId:number | undefined) : void {
    if (confirm("Apakah anda yakin akan menghapus data ini? ")) {
      this.customerService.deleteCustomer(customerId).subscribe(output => {
        this.loadCustomers();
      }, error=>{
        console.log(error)
      });
    }
  }

  
  onSearch(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.customerName?.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
