import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {Category} from '../../shared/category.model';
import {CategoryService} from '../../shared/service/category.service'
import {StorageService} from '../../shared/service/storage.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [StorageService]
})
export class CategoryDetailComponent implements OnInit {
  
  cat: any;
  cats: Category[] = [];
  catID: number;

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private catService: CategoryService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.catID = this.catService.getCategories()[+params['id']].id;
    });
      
  }

  onEditCat(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
    
  onDeleteCat(){
    this.router.navigate(['del'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
