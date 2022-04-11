import { MainService } from './../services/main.service';
import { Item } from './../interfaces/item';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['product', 'onhand', 'type' , 'creationDate'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productForm: FormGroup;
  submitted = false;
  show = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  originalData = [];
  selectproduct;
  getProductVal;
  constructor(
    private formBuilder: FormBuilder,
    public mainservice:MainService
    ) { }

ngOnInit() {
    this.productForm = this.formBuilder.group({
        Warehouse: ['', Validators.required],
        type: ['', Validators.required],
        zeropalance: [null],
        checkproduct: [null],
        selectproduct: ['']
        })

        this.dropdownList = [
          { item_id: 1,item_text: 'product 1' },
          { item_id: 2,item_text: 'product 2' },
          { item_id: 3,item_text: 'product 3' },
          { item_id: 4,item_text: 'product 4' },
          { item_id: 5,item_text: 'product 5' },
          { item_id: 6,item_text: 'product 6' },
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

      this.mainservice.dataSource.subscribe( res => {
        this.dataSource = new MatTableDataSource<Item>(res);
        this.originalData = res
      })
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

    let valtype = this.productForm.controls.type.value;
    let valProduct = this.productForm.controls.selectproduct.value;

     this.getProductVal = valProduct;
    this.selectproduct = this.getProductVal.map(x => x['item_text'])
    let filter = this.originalData;

    if (this.show) {
      let filters= filter.filter(res =>{
        return this.selectproduct.some((item)=>{
          if (valtype == res['type']){
            return res['product'] == item;
          }
        })
      });
      this.dataSource = filters;
    } else {
      this.dataSource = this.originalData;
    }
}

checkproduct(){
 let Warehouse = this.productForm.controls.Warehouse.value;
 let type = this.productForm.controls.type.value;
 let checkproduct = this.productForm.controls.checkproduct.value;

 if (Warehouse !== '' && type !== '' && checkproduct == 2) {
  this.show = true;
  this.productForm.controls.selectproduct.setValidators(Validators.required);
  this.selectproduct = this.getProductVal;
 } else {
  this.show = false;
  this.productForm.controls.selectproduct.clearValidators();
  this.selectproduct = []
 }
}
}


