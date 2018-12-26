import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Art } from '../art.model';
import { Category } from '../category.model';
import { CategoryService } from '../../shared/service/category.service';
import { ArtService } from './art.service'

@Injectable()
export class StorageService {
  constructor(
    private http: HttpClient,
    private artService: ArtService,
    private categoryService: CategoryService) { }

  // private urlArt: string = "http://192.168.182.131:3000/sites";
  // private urlCat: string = "http://192.168.182.131:3000/categories";
  private urlCat: string = "https://vast-woodland-42003.herokuapp.com/categories";
  private urlArt: string = "https://vast-woodland-42003.herokuapp.com/sites";
  private urlMsg: string = "https://vast-woodland-42003.herokuapp.com/messages";

  getArts() {
    this.http.get(this.urlArt).subscribe(
      (art: Art[]) => {this.artService.setArts(art)});
  }

  getArt(id) {
    return this.http.get(this.urlArt + '/' + id)
      .pipe(map(art => art));
  }

  addArt(art) {
    return this.http.post(this.urlArt, { 'site': art })
      .pipe(map(art => art));
  }

  updateArts(art) {
    return this.http.put(this.urlArt + '/' + art.id, { 'site': art })
      .pipe(map(art => art));
  }

  deleteArt(id) {
    return this.http.delete(this.urlArt + '/' + id)
      .pipe(map(art => art));
  }

  //--------------------------------------------//

  getCategories() {
    this.http.get(this.urlCat).subscribe(
      (cat: Category[]) => {this.categoryService.setCategories(cat)
    });
  }

  getCategory(id) {
    return this.http.get(this.urlCat + '/' + id)
      .pipe(map(category => category));
  }

  addCategory(category) {
    return this.http.post(this.urlCat, { 'category': category })
      .pipe(res => res);
  }

  updateCategories(category) {
    return this.http.put(this.urlCat + '/' + category.id, { 'category': category })
      .pipe(res => res);
  }

  deleteCategory(id) {
    return this.http.delete(this.urlCat + '/' + id)
      .pipe(res => res);
  }

  //--------------------------------------------//

  sendEmail(message) {
    return this.http.post(this.urlMsg, { 'message': message })
      .pipe(res => res);
  }
}