import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Art } from '../../shared/art.model';
import { ArtService } from '../../shared/service/art.service';
import { StorageService } from '../../shared/service/storage.service'
import { CategoryService } from '../../shared/service/category.service'
import { AuthGuard } from "../../user/guards/user.guard";
import { Category } from '../../shared/category.model'

import { MaterializeDirective } from "angular2-materialize";

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css'],
  providers: [StorageService]
})
export class ArtListComponent implements OnInit{
  arts: Art[];
  subscription: Subscription;
  id: number;
  auth = this.guard
  page:any
  cats: Category[];
  filteredCate = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private artService: ArtService,
    private guard: AuthGuard,
    private catService: CategoryService
    ){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.storageService.getArts()
      this.storageService.getCategories()
    });
    this.artService.artChanged.subscribe((artss: Art[]) => {this.arts = artss;});
    this.catService.categoryChanged.subscribe((catss: Category[]) => {this.cats = catss;});
    
  }

  onNewArt() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  artFilter(value){
    this.filteredCate = value
  }
}