import { Product } from './../../interfaces/product.interface';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  showResultRenderBox: boolean = false;
  productSearchText: string = '';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private apiService: ApiService) {}

  // Fetch all products first
  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe((response: any) => {
      this.allProducts = response.data;
    });
  }

  // Toggle search box
  onSearchFocusIn(): void {
    this.showResultRenderBox = true;
  }
  onSearchFocusOut(): void {
    setTimeout(() => {
      this.showResultRenderBox = false;
      this.filteredProducts = [];
    }, 300);
  }

  // Search box functionality
  onSearchInput() {
    this.filteredProducts = [];
    this.allProducts.forEach((product) => {
      if (
        product.name
          .toLowerCase()
          .includes(this.productSearchText.toLowerCase())
      ) {
        this.filteredProducts.push(product);
      }
    });
  }
}
