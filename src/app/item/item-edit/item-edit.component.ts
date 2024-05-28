import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '@app/core/model/item';
import { ItemService } from '@app/core/services/item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})
export class ItemEditComponent implements OnInit{
  itemId: number = 0;

  item : Item = {
    itemsId : 0,
    itemsName : 'string',
    itemsCode : 'string',
    stock : 'string',
    price : 'string'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService) {}

  ngOnInit(): void {
      this.itemId = this.route.snapshot.params['id'];
      this.getItem(this.itemId);
  }

  getItem(id:number): void {
    this.itemService.getItem(id).subscribe(item => this.item = item);
  }

  onSubmit(): void {
    this.itemService.updateItem(this.item).subscribe(() => {
      this.router.navigate(['/item']);
    }, error => {
      console.log(error);
    });
  }

}
