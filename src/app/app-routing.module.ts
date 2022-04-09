import { ProductComponent } from './product/product.component';
import { HomepgaeComponent } from './homepgae/homepgae.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'HomePage', component: HomepgaeComponent },
  { path: 'product' , component: ProductComponent},
  { path: '**' , redirectTo:'HomePage'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
