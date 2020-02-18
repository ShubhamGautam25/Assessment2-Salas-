import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'admin'},
  {path:'admin', loadChildren:() => import('./product/product.module').then(m => m.ProductModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
