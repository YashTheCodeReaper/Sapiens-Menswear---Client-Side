import { EventsService } from './../../../services/events.service';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../interfaces/product.interface';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product!: Product;
  isLogged: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService,
    private eventsService: EventsService
  ) {
    // check login status
    this.isLogged = this.userService.isLogged;
  }

  // Get review length from product
  getReviewLength(product: any) {
    return JSON.parse(product.reviews).length;
  }

  // upon pressing add to cart button
  onAddToCart() {
    // initialize cart property of product item
    this.product['cart'] = { id: this.product.id, count: 0 };
    if (!this.isLogged) {
      // if not logged in, navigate to login page
      this.router.navigate(['/login']);
    } else {
      // else add item
      this.addItem();
    }
  }

  // upon adding an item to cart
  addItem() {
    this.product.cart.count += 1;
    this.productService.modifyUserCart(this.product);
    this.eventsService.eventSubject.next('check cart count');
  }

  // upon removing an item from cart
  removeItem() {
    if (this.product.cart.count > 0) {
      this.product.cart.count -= 1;
      this.productService.modifyUserCart(this.product);
      this.eventsService.eventSubject.next('check cart count');
    }
  }
}
