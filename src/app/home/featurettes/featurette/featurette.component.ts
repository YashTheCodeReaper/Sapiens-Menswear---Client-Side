import { ProductService } from './../../../services/product.service';
import { EventsService } from './../../../services/events.service';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Product } from './../../../interfaces/product.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featurette',
  templateUrl: './featurette.component.html',
  styleUrls: ['./featurette.component.css'],
})
export class FeaturetteComponent {
  @Input() product!: Product;
  @Input() featureRibbon!: string;
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

  // Get the length of the review in a particular product
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

  // function called upon adding an item to cart
  addItem() {
    this.product.cart.count += 1;
    this.productService.modifyUserCart(this.product);
    this.eventsService.eventSubject.next('check cart count');
  }

  // function called upon removing an item to cart
  removeItem() {
    if (this.product.cart.count > 0) {
      this.product.cart.count -= 1;
      this.productService.modifyUserCart(this.product);
      this.eventsService.eventSubject.next('check cart count');
    }
  }
}
