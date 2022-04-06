import { UserService } from './services/user.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchbarComponent } from './header/searchbar/searchbar.component';
import { NavigationsComponent } from './header/navigations/navigations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryboxComponent } from './home/categorybox/categorybox.component';
import { HomeComponent } from './home/home.component';
import { FeaturettesComponent } from './home/featurettes/featurettes.component';
import { ProductsComponent } from './home/products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { FeaturetteComponent } from './home/featurettes/featurette/featurette.component';
import { ProductComponent } from './home/products/product/product.component';
import { BasketComponent } from './basket/basket.component';
import { CartitemComponent } from './basket/cartitem/cartitem.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProfileComponent } from './home/profile/profile.component';
import { OrdersComponent } from './home/orders/orders.component';

export function validateUserLogin(userService: UserService) {
  return () => userService.validateLogin();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchbarComponent,
    NavigationsComponent,
    CategoryboxComponent,
    HomeComponent,
    FeaturettesComponent,
    ProductsComponent,
    RegisterComponent,
    LoginComponent,
    RedirectorComponent,
    FeaturetteComponent,
    ProductComponent,
    BasketComponent,
    CartitemComponent,
    ProductdetailComponent,
    ProfileComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: validateUserLogin,
      deps: [UserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
