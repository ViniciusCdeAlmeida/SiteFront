import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';

import {ActivatedRoute, Params} from '@angular/router'
import { Subscription } from 'rxjs/Subscription';

import {Category} from '../../../shared/category.model'
import {StorageService} from '../../../shared/service/storage.service';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService,
    private route: ActivatedRoute, 
  ) {}

  private categories: Category[] = [];

  @Output('value') value2: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('value') value: ElementRef;

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.storageService.getCategories()});
    this.categoryService.categoryChanged.subscribe(
      (cats: Category[]) => {
        this.categories = cats;
      });
    
  }

}
