import { Component, OnInit, Input } from '@angular/core';

import {Category} from '../../../shared/category.model'

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  constructor() { }

  @Input() category: Category;
  @Input() index: number;

  ngOnInit() {}

}
