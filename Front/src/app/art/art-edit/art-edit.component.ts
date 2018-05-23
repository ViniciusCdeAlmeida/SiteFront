import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http'

import { Subscription } from 'rxjs/Subscription';

import { CategoryService } from '../../shared/service/category.service'
import { ArtService } from '../../shared/service/art.service';
import { StorageService } from '../../shared/service/storage.service'
import { Art } from '../../shared/art.model'
import { Category } from '../../shared/category.model'

@Component({
  selector: 'app-art-edit',
  templateUrl: './art-edit.component.html',
  styleUrls: ['./art-edit.component.css'],
  providers: [StorageService]
})
export class ArtEditComponent implements OnInit {

  id: number;
  subID: number;
  editMode = false;
  artForm: FormGroup;
  art: Art = new Art;
  image: any;

  categories: Category[] = [];

  constructor(private route: ActivatedRoute,
    private artService: ArtService,
    private router: Router,
    private storageService: StorageService,
    private categoryService: CategoryService) {
  }

  /* FUNCIONANDO SOMENTE 1 IMG COM BASE64 */
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.image = reader.result;
        this.artForm.get('picture').setValue(this.image);
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.subID = params['id']
      this.editMode = params['id'] != null;
      this.initForm();
      this.storageService.getCategories();});
    this.categoryService.categoryChanged.subscribe((cats: Category[]) => {this.categories = cats;});
  }

  onSubmit() {
    if (this.editMode) {
      this.artService.updateArt(this.subID, this.artForm.value);
      this.storageService.updateArts(this.artForm.value).subscribe(data => this.artForm.value);
    } else {
      this.artService.addArt(this.artForm.value);
      this.storageService.addArt(this.artForm.value).subscribe(data => this.artForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/art'], { relativeTo: this.route });
  }

  private initForm() {
    let artTitle = '';
    let artImgpath;
    let artDescription = '';
    let artCategory = '';
    let artId: number;

    if (this.editMode) {
      this.route.params.subscribe((params: Params) => {this.id = this.artService.getArts()[params['id']].id;});
      const art = this.artService.getArt(this.id);
      artTitle = art[0].title;
      artImgpath = art[0].picture;
      artDescription = art[0].description;
      artCategory = art[0].category;
      artId = art[0].id
    }

    /* ONDE GRAVA NO JSON */
    this.artForm = new FormGroup({
      'title': new FormControl(artTitle, Validators.required),
      'picture': new FormControl(artImgpath, Validators.required),
      'description': new FormControl(artDescription, Validators.required),
      'category': new FormControl(artCategory, Validators.required),
      'id': new FormControl(artId, Validators.required)
    });
  }

}
