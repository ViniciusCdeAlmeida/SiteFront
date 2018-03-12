import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Art } from '../art.model';
import { Category } from '../category.model';
import { CategoryService } from '../../shared/service/category.service';
import { ArtService } from './art.service'

@Injectable()
export class StorageService {
  constructor(
    private http: Http,
    private artService: ArtService,
    private categoryService: CategoryService) { }

  // private urlArt: string = "http://192.168.182.131:3000/sites";
  // private urlCat: string = "http://192.168.182.131:3000/categories";
  private urlCat: string = "https://vast-woodland-42003.herokuapp.com/categories";
  private urlArt: string = "https://vast-woodland-42003.herokuapp.com/sites";
  private urlMsg: string = "https://vast-woodland-42003.herokuapp.com/messages";

  getArts() {
    this.http.get(this.urlArt).map((response: Response) => {
      const arts: Art[] = response.json();
      return arts;
    }).subscribe(
      (art: Art[]) => { this.artService.setArts(art) });
  }

  getArt(id) {
    return this.http.get(this.urlArt + '/' + id)
      .map(art => art.json());
  }

  addArt(art) {
    return this.http.post(this.urlArt, { 'site': art })
      .map(res => res.json());
  }

  updateArts(art) {
    return this.http.put(this.urlArt + '/' + art.id, { 'site': art })
      .map(res => res.json());
  }

  deleteArt(id) {
    return this.http.delete(this.urlArt + '/' + id)
      .map(res => res.json());
  }

  //--------------------------------------------//

  getCategories() {
    this.http.get(this.urlCat).map((response: Response) => {
      const cats: Category[] = response.json();
      return cats;
    }).subscribe(
      (cat: Category[]) => { this.categoryService.setCategories(cat) });
  }

  getCategory(id) {
    return this.http.get(this.urlCat + '/' + id)
      .map(category => category.json());
  }

  addCategory(category) {
    return this.http.post(this.urlCat, { 'category': category })
      .map(res => res.json());
  }

  updateCategories(category) {
    return this.http.put(this.urlCat + '/' + category.id, { 'category': category })
      .map(res => res.json());
  }

  deleteCategory(id) {
    return this.http.delete(this.urlCat + '/' + id)
      .map(res => res.json());
  }

  //--------------------------------------------//

  sendEmail(message) {
    return this.http.post(this.urlMsg, { 'message': message })
      .map(res => res.json());
  }
}