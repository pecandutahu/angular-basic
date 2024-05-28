import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../model/item';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environtment/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemSubject: BehaviorSubject<Item | null>;
  public item: Observable<Item | null>;

  constructor( private router: Router, private http: HttpClient) {
    this.itemSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('item')!)
    )
    this.item = this.itemSubject.asObservable();
  }

  public get itemValue() {
    return this.itemSubject.value;
  }

  createItem(item:Item) {
    return this.http.post(
      `${environment.apiUrl}/items/create`,
      item
    )
  }

  getItems() {
    return this.http.get<Item[]>(`${environment.apiUrl}/items/lists`);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${environment.apiUrl}/items/list/${id}`);
  }

  deleteItem(id: number | undefined): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/items/delete/${id}`);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put(`${environment.apiUrl}/items/update/${item.itemsId}`, item);
  }

}
