import { Category } from '../../interfaces/category.interface';
import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorybox',
  templateUrl: './categorybox.component.html',
  styleUrls: ['./categorybox.component.css'],
})
export class CategoryboxComponent implements OnInit {
  allCategories: Category[] = [];

  constructor(private apiService: ApiService) {}

  // Fetch all categories from DB
  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe((response: any) => {
      this.allCategories = response.data;
    });
  }

  // Horizontal scrolling functionality of category box
  onMouseWheelScroll(event: WheelEvent) {
    document.getElementById('category-flexbox-scroll')!.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
    });
  }

  // We dont need to scroll down if the pointer is in the category box
  onMouseEnterCategoryFlex() {
    document.body.style.overflowY = 'hidden';
  }

  // We need to have scroll down only if the pointer is out of the category box
  onMouseLeaveCategoryFlex() {
    document.body.style.overflowY = 'scroll';
  }
}
