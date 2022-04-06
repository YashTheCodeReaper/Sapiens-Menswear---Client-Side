import { UserService } from './../../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Product } from './../../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: any;
  catProducts: any;
  userCart: any;
  categoryName!: string;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Set categoryName from query parameters
    this.categoryName = this.activatedRoute.snapshot.queryParams['category'];
    // Get all products from db
    this.apiService.getAllProducts().subscribe(
      // assign response data to allProducts
      (response: any) => {
        this.allProducts = response.data;
      },
      // In case of any error, log it to console
      (error) => {
        console.log(error);
      },
      // Upon completion of subscription
      () => {
        // If the categoryName is all, set the catProducts value to allProducts
        if (this.categoryName == 'all') {
          this.catProducts = this.allProducts;
        } else if (this.categoryName == 'combo') {
          // on clicking a combo pack, empty the catProducts array
          this.catProducts = [];
          // fetch the combo data from the DB
          this.apiService
            .getCombo(this.activatedRoute.snapshot.queryParams['categoryName'])
            .subscribe((response) => {
              // for each product in the combo pack
              JSON.parse(response.data[0].products).forEach(
                (productid: any) => {
                  // match the product id from the combo pack with allProducts array, then assign correspondings
                  this.allProducts.forEach((product: any) => {
                    if (product.id == productid) {
                      this.catProducts.push(product);
                      return;
                    }
                  });
                }
              );
            });
        }
        // Subscribe to queryParams in case of any changes in category query
        this.activatedRoute.queryParams.subscribe((param: Params) => {
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
              }
            );
          }
          // need to empty carProducts in case of any change in category query
          this.catProducts = [];
          // get the newest category name
          this.categoryName = param['category'];
          // if it is not all, match products with category name and add that to catProducts array.
          if (this.categoryName != 'all') {
            this.allProducts.forEach((product: any) => {
              if (product.category == this.categoryName) {
                this.catProducts.push(product);
              }
            });
          }
          // if it is all, then assign catProducts to allProducts
          else {
            this.catProducts = this.allProducts;
          }
        });
      }
    );
  }
}
