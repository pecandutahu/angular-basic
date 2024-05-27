import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../core/services/customer.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  form!:FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService:CustomerService
  ){
    if (this.customerService.customerValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        customerName: ['', Validators.required],
        customerAddress: ['', Validators.required],
        customerCode: ['', Validators.required],
        customerPhone: ['', Validators.required],
        isActive: [''],
        lastOrderDate: [''],
      })
  }

  onSubmit(){
    this.submitted = true;
    
    this.error = '';

    if(this.form.valid) {
      return;
    }
    this.loading = true;
    this.customerService
    .createCustomer(this.form.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigate([''], {
          queryParams: { registered: true },
        });
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    })
  }

  get f() {
    return this.form.controls;
  }


}
