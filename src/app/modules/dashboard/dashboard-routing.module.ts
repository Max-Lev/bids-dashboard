import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { dashboardResolver } from 'src/app/core/resolvers/dashboard.resolver';
import { ProductComponent } from './pages/product/product.component';
import { productResolver } from 'src/app/core/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      dashboardResolver: dashboardResolver,
    },
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      {
        path: 'products/:id',
        component: ProductComponent,
        resolve: {
          productResolver: productResolver,
        },
      }, // 👈 flat structure
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
