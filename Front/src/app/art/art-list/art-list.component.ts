import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Art } from '../../shared/art.model';
import { ArtService } from '../../shared/service/art.service';
import { StorageService } from '../../shared/service/storage.service'
import { MaterializeDirective } from "angular2-materialize";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation,NgxGalleryLayout,NgxGalleryImageSize } from 'ngx-gallery';

import { AuthGuard } from "../../user/guards/user.guard";

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css'],
  providers: [StorageService]
})
export class ArtListComponent implements OnInit {
  arts: Art[];
  subscription: Subscription;
  id: number;
  auth = this.guard
  page: any
  artImg = []

  idImg:number
  urlImg:string

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private artService: ArtService,
    private guard: AuthGuard
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.storageService.getArts()
    });
    this.artService.artChanged.subscribe((artss: Art[]) => {
      this.arts = artss;
      for (var index = 0; index < this.arts.length; index++) {
        this.artImg.push
        ({
          small: this.arts[index].picture.url,
          medium: this.arts[index].picture.url,
          big: this.arts[index].picture.url,
          description: this.arts[index].description,
          url: this.arts[index].id
        })
      }
    });
    this.galleryOptions = [
      {
        height: '1500px',
        thumbnailsColumns: 4,
        // imageAnimation: NgxGalleryAnimation.Slide,
        layout: NgxGalleryLayout.ThumbnailsTop,
        width: '100%',
        imageArrowsAutoHide: true,
        previewFullscreen: true,
        previewCloseOnClick: true,
        imageSwipe: true, 
        thumbnailsSwipe: true, 
        previewSwipe: true,
        imageSize: NgxGalleryImageSize.Contain,
        previewZoom: true, thumbnailsPercent: 90, thumbnailsMargin: 10, thumbnailMargin: 10
      }
    ];
  }

  idFound(url){
    this.artImg.filter(found => {
      if(found == url)
      console.log(found)
    })
  }

  imgClick($event){
    if (event.srcElement.lastChild){
      let file = event.srcElement.lastChild.parentNode.childNodes[1].attributes[2].nodeValue;
      this.urlImg = file

      this.artImg.filter((found,i) => {
        if(found.small == file){
          this.urlImg = found.url
        }
      })
    }
  }

  onNewArt() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}