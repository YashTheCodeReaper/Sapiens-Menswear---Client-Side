import { EventsService } from './../../services/events.service';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { Product } from './../../interfaces/product.interface';
import { ApiService } from './../../services/api.service';
import { Combo } from './../../interfaces/combo.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-featurettes',
  templateUrl: './featurettes.component.html',
  styleUrls: ['./featurettes.component.css'],
})
export class FeaturettesComponent implements OnInit {
  allCombos: Combo[] = [];
  allProducts: Product[] = [];
  topSelling = 'TOP SELLING';
  mostPopular = 'MOST POPULAR';
  featured = 'FEATURED';

  constructor(
    private apiService: ApiService,
    private eventsService: EventsService,
    private productService: ProductService,
    private userService: UserService
  ) {
    // If the user is logged in, then merge user cart with products
    if (this.userService.isLogged) {
      this.productService.getMergedProductWithUserCart();
    } else {
      // If the user is not logged, then only get the products, no merge
      this.productService.getAllProducts();
      this.apiService.getAllProducts().subscribe((response) => {
        this.allProducts = response.data;
      });
    }
    this.allProducts = this.productService.allProducts;
  }

  ngOnInit(): void {
    // get all the combo packs from DB
    this.apiService.getAllCombos().subscribe((response: any) => {
      this.allCombos = response.data;
    });

    // If the user is logged in, listen to the merged cart product event
    if (this.userService.isLogged) {
      this.eventsService.eventSubject.subscribe((eventData) => {
        if (eventData == 'merged product with user cart') {
          this.allProducts = this.productService.allProducts;
        }
      });
    }
    // If the user is not logged in, listen to the only products event
    else {
      this.eventsService.eventSubject.subscribe((eventData) => {
        if (eventData == 'got all products') {
          this.allProducts = this.productService.allProducts;
        }
      });
    }
  }
}
