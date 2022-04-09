import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface Item {
  onhand: string;
  product: string;
  type: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['product', 'onhand', 'type'];
  dataSource = new MatTableDataSource<Item>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productForm: FormGroup;
  submitted = false;
  show = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private formBuilder: FormBuilder) { }

ngOnInit() {
    this.productForm = this.formBuilder.group({
        Warehouse: ['', Validators.required],
        type: ['', Validators.required],
        zeropalance: [null],
        checkproduct: [null],
        selectproduct: ['']
        })

        this.dropdownList = [
          { item_id: 1, item_text: 'Product 1' },
          { item_id: 2, item_text: 'Product 2' },
          { item_id: 3, item_text: 'Product 3' },
        ];
    
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

get f() { return this.productForm.controls; }


onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
    }
}

checkproduct(){
 let Warehouse = this.productForm.controls.Warehouse.value;
 let type = this.productForm.controls.type.value;
 let checkproduct = this.productForm.controls.checkproduct.value;

 if (Warehouse !== '' && type !== '' && checkproduct == 2) {
  this.show = true;
  this.productForm.controls.selectproduct.setValidators(Validators.required)
 } else {
  this.show = false;
 }
}
}

const ELEMENT_DATA: Item[] = [
  {product: 'product 1', onhand: '123', type: 'Type A'},
  {product: 'product 2', onhand: '123', type: 'Type B'},
  {product: 'product 3', onhand: '123', type: 'Type C'},
  {product: 'product 4', onhand: '123', type: 'Type B'},
  {product: 'product 5', onhand: '123', type: 'Type B'},
  {product: 'product 6', onhand: '123', type: 'Type C'},
  {product: 'product 7', onhand: '123', type: 'Type A'},
];
