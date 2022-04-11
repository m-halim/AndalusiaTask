import { Item } from './../interfaces/item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainService {


  ELEMENT_DATA: Item[] = [
    {product: 'product 1', onhand: '123', type: 'Type A' , creationDate: new Date()},
    {product: 'product 2', onhand: '123', type: 'Type B' , creationDate: new Date()},
    {product: 'product 3', onhand: '123', type: 'Type C' , creationDate: new Date()},
    {product: 'product 4', onhand: '123', type: 'Type B' , creationDate: new Date()},
    {product: 'product 5', onhand: '123', type: 'Type B' , creationDate: new Date()},
    {product: 'product 6', onhand: '123', type: 'Type C' , creationDate: new Date()},
    {product: 'product 7', onhand: '123', type: 'Type A' , creationDate: new Date()},
  ];

  dataSource = new BehaviorSubject(this.ELEMENT_DATA)

  constructor() { }

}
