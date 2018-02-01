import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Art } from '../../shared/art.model';
import { ArtService } from '../../shared/service/art.service';
import { StorageService } from '../../shared/service/storage.service'
import { MaterializeDirective } from "angular2-materialize";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

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
      console.log(this.artImg[0].url)
      this.idImg = this.artImg[0].url
    });
    this.galleryOptions = [
      {
        height: '1400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        width: '1400px',
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        imageArrowsAutoHide: true,
        previewFullscreen: true,
        imageSize: "contain",
        previewZoom: true
      },
      // max-width 800
      {
        breakpoint: 500,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 0,
        thumbnailsMargin: 0,
        thumbnailMargin: 0
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }
  // .parentNode.children["0"].currentSrc
  // .parentNode.childNodes[1].currentSrc
  imgClick($event){
    let file = event.srcElement.lastChild.parentNode.childNodes[1].attributes[2].nodeValue;
    console.log(file)
  }

  onNewArt() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}