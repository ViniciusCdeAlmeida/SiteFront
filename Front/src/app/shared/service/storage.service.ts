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
  private apiKey: string = "api:key-9fe58fe05edc2b8127804db1b3797a75";
  private mailgunUrl: string = "sandbox3e756d1080da42c599d84e9026e2a2c9.mailgun.org";

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
    console.log(art)
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

  sendEmail(toEmail: string, subjectEmail: string, messageEmail: string) {
    // console.log(toEmail)
    // console.log(subjectEmail)
    // console.log(messageEmail)
    if (toEmail && subjectEmail && messageEmail) {
      let headers = new Headers(
        {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic " + this.apiKey
        }
      );
      let options = new RequestOptions({ headers: headers });
      let body = "from=test@example.com&to=" + toEmail + "&subject=" + subjectEmail + "&text=" + messageEmail;
      this.http.post("https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages", body, options)
        .map(result => result.json())
        .do(result => console.log("RESULT: ", JSON.stringify(result)))
        .subscribe(result => {
          console.log("SENT!");
          toEmail = "";
          subjectEmail = "";
          messageEmail = "";
        }, error => {
          console.log(error);
        });
    }
  }

}