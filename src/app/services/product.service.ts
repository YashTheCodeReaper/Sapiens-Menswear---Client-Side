import { EventsService } from './events.service';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { Product } from './../interfaces/product.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  allProducts: Product[] = [];
  userCart: any;
  indexBasket!: number;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private eventsService: EventsService
  ) {
    this.apiService.getAllProducts().subscribe(
      (response) => {
        this.allProducts = response.data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.eventsService.eventSubject.next('got all products');
      }
    );
  }

  getAllProducts(): Product[] {
    return this.allProducts;
  }

  getMergedProductWithUserCart(): Product[] {
    this.apiService.getAllProducts().subscribe(
      (response) => {
        this.allProducts = response.data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        // if there is any userData
        if (this.userService.userData) {
          // get user cart from db
          this.apiService.getUserCart(this.userService.userData.id).subscribe(
            (response) => {
              // assign response data to usercart
              if (response.status == 'success')
                this.userCart = JSON.parse(response.data[0].cart);
            },
            // upon any error, log it to console
            (error) => {
              console.log(error);
            },
            // upon completion of subscription
            () => {
              // for all items in allProducts array
              this.allProducts.forEach((product: any) => {
                // for all items in userCart array
                this.userCart.forEach((cartItem: any) => {
                  // if they both match, set cart of allProducts item to userCart item
                  if (cartItem.id == product.id) {
                    product['cart'] = cartItem;
                  }
                });
              });
              this.eventsService.eventSubject.next(
                'merged product with user cart'
              );
            }
          );
        }
      }
    );
    return this.allProducts;
  }

  // upon modification of user cart
  modifyUserCart(cartItemBasket: Product) {
    // make a flag
    let itemSet = false;
    // if there is any userData
    if (this.userService.userData) {
      // for every item in userData cart
      this.userService.userData.cart.forEach((cartItem: any, index: number) => {
        // if items id in both cart and product, set the flag to true, mark the index
        if (cartItem.id == cartItemBasket.id) {
          itemSet = true;
          this.indexBasket = index;
        }
      });
      // if the flag is false, i.e., no items found, push the cart to userData's cart
      if (!itemSet) this.userService.userData?.cart.push(cartItemBasket.cart);
      // if the flag is true, modify the cart item in userData's cart
      else {
        this.userService.userData.cart[this.indexBasket] = cartItemBasket.cart;
      }
      // send cart array to database
      this.apiService.updateUserCart(
        this.userService.userData.id,
        JSON.stringify(this.userService.userData.cart)
      );
    }
  }
}
