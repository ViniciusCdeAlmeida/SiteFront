import { Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { Subscription } from 'rxjs/Subscription';

import {StorageService} from '../../shared/service/storage.service';
import {Category} from '../../shared/category.model';
import {CategoryService} from '../../shared/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [StorageService]
})

export class CategoryListComponent implements OnInit {

  categories: Category[];
  subscription: Subscription;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private storageService: StorageService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {this.storageService.getCategories()});
    this.subscription = this.categoryService.categoryChanged.subscribe((cats: Category[]) => {this.categories = cats;});
    // this.categories = this.categoryService.getCategories();
  }

  onNewCategory() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
