import { EventsService } from './../../services/events.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../interfaces/product.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css'],
})
export class CartitemComponent implements OnInit {
  @Input() cartItem!: Product;

  constructor(
    private productsService: ProductService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {}

  addItem() {
    this.cartItem.cart.count += 1;
    this.productsService.modifyUserCart(this.cartItem);
    this.eventsService.eventSubject.next('check cart count');
  }

  removeItem() {
    if (this.cartItem.cart.count > 0) {
      this.cartItem.cart.count -= 1;
      this.productsService.modifyUserCart(this.cartItem);
      this.eventsService.eventSubject.next('check cart count');
    }
  }
}
