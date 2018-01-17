import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Category } from '../shared/category.model';

@Injectable()
export class CategoryService {

categoryChanged = new Subject<Category[]>();

private categories: Category[] =[]

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.categoryChanged.next(this.categories.slice());
  }

  getCategories() {
    return this.categories.slice();
  }

  getCategory(index: number) {
    return this.categories.filter(found => 
      {
        if(found.id == index)
          return found
      });
  }

  addCategory(category: Category) {
    this.categories.push(category);
    this.categoryChanged.next(this.categories.slice());
  }

  updateCategory(index: number, newCategory: Category) {
    this.categories[index] = newCategory;
    this.categoryChanged.next(this.categories.slice());
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
    this.categoryChanged.next(this.categories.slice());
  }
}
