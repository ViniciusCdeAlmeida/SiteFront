import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Art } from '../art.model';
import { Category } from '../category.model';
import { CategoryService } from '../../category/category.service';
import { ArtService } from './art.service'

@Injectable()
export class StorageService {
  constructor(
    private http: Http, 
    private artService: ArtService,
    private categoryService: CategoryService) {}

  private urlArt: string = "http://192.168.182.131:3000/sites";
  private urlCat: string = "http://192.168.182.131:3000/categories";

  artChanged = new Subject<Art[]>();
  categoryChanged = new Subject<Category[]>();

  private categories: Category[] =[]
  private arts: Art[] = [];

  /*-----------------------------------ART--------------------------------------*/

  setArts(arts1: Art[]) {
    this.arts = arts1;
    this.artChanged.next(this.arts.slice());
  }

  getLocalArts() {
    return this.arts.slice();
  }

  getLocalArt(index: number) {
    return this.arts.filter(found => 
      {
        if(found.id == index)
          return found
      });
  }

  addLocalArt(art: Art) {
    this.arts.push(art);
    this.artChanged.next(this.arts.slice());
  }

  updateLocalArt(index: number, newArt: Art) {
    this.arts[index] = newArt;
    this.artChanged.next(this.arts.slice());
  }

  deleteLocalArt(index: number) {
    this.arts.splice(index, 1);
    this.artChanged.next(this.arts.slice());
  }

  getArts(){
    this.http.get(this.urlArt).map((response: Response) => {
        const arts: Art[] = response.json(); 
        return arts;}).subscribe(
          (art: Art[]) => {this.setArts(art)});
  }

  //-----WEB ART-----//

  getArt(id){
    return this.http.get(this.urlArt + '/' + id).map(art => art.json());}

  addArt(art){
    return this.http.post(this.urlArt, {'site': art}).map(res => res.json());}

  updateArts(art){
    return this.http.put(this.urlArt + '/' + art.id,  {'site': art}).map(res => res.json());}

  deleteArt(id){
    return this.http.delete(this.urlArt + '/' + id).map(res => res.json());}

  /*-----------------------------------CAT--------------------------------------*/

  setLocalCategories(categories1: Category[]) {
    this.categories = categories1;
    this.categoryChanged.next(this.categories.slice());
  }

  getLocalCategories() {
    return this.categories.slice();
  }

  getLocalCategory(index: number) {
    return this.categories[index];
  }

  addLocalCategory(category: Category) {
    this.categories.push(category);
    this.categoryChanged.next(this.categories.slice());
  }

  updateLocalCategory(index: number, newCategory: Category) {
    this.categories[index] = newCategory;
    this.categoryChanged.next(this.categories.slice());
  }

  deleteLocalCategory(index: number) {
    this.categories.splice(index, 1);
    this.categoryChanged.next(this.categories.slice());
  }

  getCategories(){
    this.http.get(this.urlCat).map((response: Response) => {
        const cats: Category[] = response.json(); 
        return cats;}).subscribe(
          (cat: Category[]) => {this.setLocalCategories(cat)});
  }

  //-----WEB CAT-----//

  getCategory(id){
    return this.http.get(this.urlCat + '/' + id).map(category => category.json());}

  addCategory(category){
    return this.http.post(this.urlCat, {'category': category}).map(res => res.json());}

  updateCategories(category){
    return this.http.put(this.urlCat + '/' + category.id,  {'category': category}).map(res => res.json());}

  deleteCategory(id){
    return this.http.delete(this.urlCat + '/' + id).map(res => res.json());}

}