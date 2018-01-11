import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Response} from '@angular/http'

import { Subscription } from 'rxjs/Subscription';

import {CategoryService} from '../../category/category.service'
import { ArtService } from '../../shared/service/art.service';
import {StorageService} from '../../shared/service/storage.service'
import {Art} from '../../shared/art.model'
import {Category} from '../../shared/category.model'

@Component({
  selector: 'app-art-edit',
  templateUrl: './art-edit.component.html',
  styleUrls: ['./art-edit.component.css'],
  providers: [StorageService]
})
export class ArtEditComponent implements OnInit {
  
  id: number;
  value: number;
  editMode = false;
  artForm: FormGroup;
  art: Art = new Art;
  image: any;

  @ViewChild('picture') picture: ElementRef;

  private categories: Category[] = [];

  constructor(private route: ActivatedRoute,
              private artService: ArtService,
              private router: Router,
              private storageService: StorageService,
              private categoryService: CategoryService) {
  }

  /* FUNCIONANDO SOMENTE 1 IMG COM BASE64 */
  onFileChange(event){
    let reader = new FileReader();
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.image = reader.result;
        this.artForm.get('picture').setValue(this.image);
        console.log(this.artForm.get('picture'))
      };
      reader.readAsDataURL(file);
    }
  }

  // onFileChange(event){
  //   let reader = new FileReader();
  //   if(event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     reader.onloadend = () => {
  //       this.image = reader.result;
        
  //       this.artForm.get('picture').setValue(this.image);
  //       console.log(this.artForm.get('picture'))
  //     };
  //     reader.readAsBinaryString(file);
  //   }
  // }


  /* onFileChange(event){
    let j = 0;
    if(event.target.files.length > 0) { 
      for(let i = 0; i < event.target.files.length; i++){
        let reader = new FileReader();      
        let file = event.target.files[j];       
        console.log(file);
        console.log(j);
        // this.image[j] = file;
        // this.artForm.get('picture').setValue(this.image);
        // reader.readAsDataURL(file);
        reader.onprogress = () => {
          j--;
          this.image[j] = reader.result;
          this.artForm.get('picture').setValue(this.image);
          // this.artForm.get('multipic').setValue(this.image);
          };
        reader.readAsDataURL(file);
        console.log(this.artForm.get('picture'))
        j++;
      }
      console.log(this.artForm)
    }
    // console.log(this.image)
  } */

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
          this.storageService.getCategories();
        }
      );
      this.categoryService.categoryChanged.subscribe(
        (cats: Category[]) => {
          this.categories = cats;
        });
  }

  onSubmit() {
    if (this.editMode) {
      // console.log(this.artForm.value)
      this.artService.updateArt(this.id, this.artForm.value);
      this.storageService.updateArts(this.artForm.value).subscribe(data => this.artForm.value);{}
    } else {
      this.artService.addArt(this.artForm.value);
      // console.log(this.artForm.value)
      this.storageService.addArt(this.artForm.value).subscribe(data => this.artForm.value);{}
    }    
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let artTitle = '';
    let artImgpath;
    let artDescription = '';
    let artCategory = '';
    let artId: number;

    if (this.editMode) {
      // console.log(this.id);
      const art = this.artService.getArt(this.id);
      // const art1 = this.artService.getArts();
      // console.log(art[0]);
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
