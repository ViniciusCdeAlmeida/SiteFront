import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {Category} from '../../shared/category.model';
import {StorageService} from '../../shared/service/storage.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [StorageService]
})
export class CategoryDetailComponent implements OnInit {
  
  cat: any = this.storageService.getCategories();
  cats: Category[] = [];
  catID: number;

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.catID = +params['id'];
      this.storageService.getCategory(this.catID).subscribe(
        cat => this.cat = cat);});
  }

  onEditCat(){
    
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
    
  deleteCat(cats){
    
    this.storageService.deleteCategory(this.catID).subscribe(null);
  }

}
