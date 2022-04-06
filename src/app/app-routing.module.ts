import { ProfileComponent } from './home/profile/profile.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AuthguardService } from './services/authguard.service';
import { BasketComponent } from './basket/basket.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { RegisterComponent } from './register/register.component';
import { FeaturettesComponent } from './home/featurettes/featurettes.component';
import { ProductsComponent } from './home/products/products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './home/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FeaturettesComponent,
      },
      {
        path: 'categoryview',
        component: ProductsComponent,
      },
      {
        path: 'basket',
        component: BasketComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'product',
        component: ProductdetailComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthguardService],
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'redirect',
    component: RedirectorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
