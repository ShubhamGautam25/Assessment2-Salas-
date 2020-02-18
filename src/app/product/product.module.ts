import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from "./product-routing.module";
import { ProductListComponent } from './product-list/product-list.component';
import { CardComponent } from './card/card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from "@angular/forms";
import { CardPageComponent } from './card-page/card-page.component';
import { MatDialogModule ,MatListModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
@NgModule({
  declarations: [ProductComponent, ProductListComponent, CardComponent, CardPageComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
