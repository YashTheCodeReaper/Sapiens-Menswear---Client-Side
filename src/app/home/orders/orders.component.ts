import { Product } from './../../interfaces/product.interface';
import { ProductService } from './../../services/product.service';
import { Order } from './../../interfaces/order.interface';
import { UserService } from './../../services/user.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders!: any;
  price!: number;

  constructor(
    private apiService: ApiService,
    private userSerivce: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Merge user cart with each relevant product
    this.productService.getMergedProductWithUserCart();
    // If there is userData
    if (this.userSerivce.userData) {
      // get all the orders from DB
      this.apiService.getUserOrders(this.userSerivce.userData?.id).subscribe(
        (response) => {
          this.orders = response.data;
        },
        (error) => {
          console.log(error);
        },
        () => {
          // For each order from response
          this.orders.forEach((order: any, index: number) => {
            // we are parsing the string to product array
            this.orders[index] = {
              orderid: order.orderid,
              id: order.id,
              products: JSON.parse(order.products.toString()),
            };
          });

          // After parsing the array, for each order
          this.orders.forEach((order: any, orderIndex: number) => {
            // For each product in the order item
            order.products.forEach((product: any, index: number) => {
              // Compare the bare id with the real product id, assign the product in place of id field
              this.productService.allProducts.forEach((allProduct) => {
                if (allProduct.id == product.id) {
                  this.orders[orderIndex].products[index].id = allProduct;
                  return;
                }
              });
            });
          });
        }
      );
    }
  }

  // function to calculate the total amount to pay for an order
  getTotalAmount(order: any) {
    this.price = 0;
    order.products.forEach((product: any) => {
      this.price += product.count * product.id.price;
    });
    return this.price;
  }
}
