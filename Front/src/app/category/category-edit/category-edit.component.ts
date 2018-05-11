import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { StorageService } from '../../shared/service/storage.service'
import { Category } from '../../shared/category.model'
import { CategoryService } from '../../shared/service/category.service'

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  providers: [StorageService]
})
export class CategoryEditComponent implements OnInit {

  id: number;
  mode:any
  subID: number;
  editMode = false;
  categoryForm: FormGroup;
  cats: Category[]

  category: Category = new Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private storageService: StorageService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.mode = this.route.snapshot.url[0].path
      if(this.mode != 'new'){
        this.mode = this.route.snapshot.url[1].path
      }
      this.subID = params['id'];
      this.editMode = params['id'] != null;
      if(this.mode == 'edit' || this.mode == 'new'){
        this.initForm();
      }
      else{
        this.onDelete()
        this.categoryService.categoryChanged.subscribe((cats: Category[]) => {this.cats = cats;});
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDel(){
    this.router.navigateByUrl('/category', { skipLocationChange: false});
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  save() {

    if (this.mode == 'edit') {
      this.categoryService.updateCategory(this.subID, this.categoryForm.value);
      this.storageService.updateCategories(this.categoryForm.value).subscribe(data => this.categoryForm.value)
      this.onCancel();
    }
    if (this.mode == 'new') {
      this.categoryService.addCategory(this.categoryForm.value);
      this.storageService.addCategory(this.categoryForm.value).subscribe(data => this.categoryForm.value);
    }
  }

  onDelete(){
    this.route.params.subscribe((params: Params) => { this.id = this.categoryService.getCategories()[params['id']].id; });
    this.categoryService.deleteCategory(this.id);
    this.storageService.deleteCategory(this.id).subscribe(data => this.id);
    
  }

  private initForm() {
    let categoryTitle = '';
    let catID: number;

    if (this.editMode) {
      this.route.params.subscribe((params: Params) => { this.id = this.categoryService.getCategories()[params['id']].id; });
      const category = this.categoryService.getCategory(this.id);
      categoryTitle = category[0].title;
      catID = category[0].id;
    }

    this.categoryForm = new FormGroup({
      'title': new FormControl(categoryTitle, Validators.required),
      'id': new FormControl(catID, Validators.required)
    });
  }



}
