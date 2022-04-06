import { UserService } from './../services/user.service';
import { EventsService } from './../services/events.service';
import { ProductService } from './../services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Product } from './../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  product!: Product;
  productReview!: {
    name: string;
    description: string;
    rating: number;
    image: string;
  }[];
  index!: number;
  isLogged: boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // merge the user cart with product
    this.productService.getMergedProductWithUserCart();
    // assign login status
    this.isLogged = this.userService.isLogged;
  }

  ngOnInit(): void {
    // upon emittion after merging product from cart
    this.eventsService.eventSubject.subscribe((eventData) => {
      if (eventData == 'merged product with user cart') {
        // match the product id from allProduct and assign respective fields
        this.productService.allProducts.forEach((product) => {
          if (product.id == this.activatedRoute.snapshot.queryParams['id']) {
            this.product = product;
            this.productReview = JSON.parse(this.product.reviews.toString());
            return;
          }
        });
      }
    });
    // have an active queryParams subscription to watch any updates
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // match the product id from allProduct and assign respective fields
      this.productService.allProducts.forEach((product) => {
        if (product.id == params['id']) {
          this.product = product;
          this.productReview = JSON.parse(this.product.reviews.toString());
          return;
        }
      });
    });
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

  // upon adding item to cart
  addItem() {
    this.product.cart.count += 1;
    this.productService.modifyUserCart(this.product);
    this.eventsService.eventSubject.next('check cart count');
  }

  // upon removing item from cart
  removeItem() {
    if (this.product.cart.count > 0) {
      this.product.cart.count -= 1;
      this.productService.modifyUserCart(this.product);
      this.eventsService.eventSubject.next('check cart count');
    }
  }
}
