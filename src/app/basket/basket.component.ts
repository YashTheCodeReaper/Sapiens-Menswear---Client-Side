import { Router } from '@angular/router';
import { EventsService } from './../services/events.service';
import { ProductService } from './../services/product.service';
import { User } from './../interfaces/user.interface';
import { Product } from './../interfaces/product.interface';
import { UserService } from './../services/user.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  // Declarations
  allProducts: Product[] = [];
  userData!: User;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private eventsService: EventsService,
    private apiService: ApiService,
    private router: Router
  ) {
    // To be used for getting address
    if (this.userService.userData) {
      this.userData = this.userService.userData;
    }
    // Merge every product with user cart
    this.productService.getMergedProductWithUserCart();
  }

  ngOnInit(): void {
    // After merging finished, assign allProducts array to the allProducts in product service
    this.eventsService.eventSubject.subscribe((eventData) => {
      if (eventData == 'merged product with user cart') {
        this.allProducts = this.productService.allProducts;
      }
    });
  }

  // Product count for each one of them
  getTotalCount() {
    let i = 0;
    this.allProducts.forEach((product) => {
      if (!product.cart) return;
      if (product.cart.count > 0) {
        i++;
      }
    });
    return i;
  }

  // Product mrp(times count) for each one of them
  getTotalMrp() {
    let i = 0;
    this.allProducts.forEach((product) => {
      if (!product.cart) return;
      if (product.cart.count > 0) {
        i += product.mrp * product.cart.count;
      }
    });
    return i;
  }

  // Product price(times count) for each one of them
  getTotalPrice() {
    let i = 0;
    this.allProducts.forEach((product) => {
      if (!product.cart) return;
      if (product.cart.count > 0) {
        i += product.price * product.cart.count;
      }
    });
    return i;
  }

  // Upon confirm button pressed
  onConfirmOrder() {
    // Check for cart in userData
    if (this.userService.userData?.cart) {
      // api for inserting user cart array into the orders table
      this.apiService
        .insertUserCart(this.userService.userData?.id, {
          cart: JSON.stringify(this.userService.userData?.cart),
        })
        .subscribe(() => {
          // If there is userData in userService
          if (this.userService.userData) {
            // update the user cart with an empty array--basically its like cut paste from cart to orders
            this.apiService
              .updateUserCart(this.userService.userData?.id, '[]')
              .subscribe((response) => {
                if (response.status == 'success') {
                  // update the userData from DB again
                  this.userService.validateLogin();
                  // To evoke the cart red circle
                  this.eventsService.eventSubject.next('confirm order');
                  // Navigate to homepage
                  this.router.navigate(['/']);
                }
              });
          }
        });
    }
  }
}
