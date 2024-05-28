import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '@app/core/services/item.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css'
})
export class ItemCreateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {
    console.log(this.itemService.itemValue)
    if(this.itemService.itemValue) {
      this.router.navigate(['/item']);
    }
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        itemsName : ['', Validators.required],
        itemsCode : ['', Validators.required],
        stock : ['', Validators.required],
        price : ['', Validators.required],
      })
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if(this.form.valid) {
      this.loading = true;
      this.itemService
      .createItem(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/item']);
        },
        error: () => {
          this.error = 'Error creating item';
          this.loading = false;
        }
      })
    } else {
      this.error = 'Please fill in all fields';
    }
  }

  get f() {
    return this.form.controls;
  }
}
