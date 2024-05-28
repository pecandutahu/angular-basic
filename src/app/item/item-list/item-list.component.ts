import { Component, output } from '@angular/core';
import { Item } from '@app/core/model/item';
import { ItemService } from '@app/core/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  items: Item[] = [];
  filteredItem: any[] = [];
  searchText: string = '';

  constructor(private itemService:ItemService) {}
  ngOnInit() {
    this.loadItems()
  }

  loadItems() {
    this.itemService.getItems().subscribe(output => {
      this.items = output;
      this.filteredItem = output
    }, error => {
      console.log(error);
    });
  }

  deleteItem(itemId:number | undefined): void {
    console.log(itemId)
    if(confirm("Anda yakin akan menghapus data ini?")) {
      this.itemService.deleteItem(itemId).subscribe(output => {
        this.loadItems();
      }, error => {
        console.log(error);
      });
    }
  }

  onSearch(): void {
    this.filteredItem = this.items.filter(item =>
      item.itemsName?.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }
}
