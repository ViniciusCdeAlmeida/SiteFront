import { Component, OnInit, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import {Art} from '../../../shared/art.model';

import { AuthGuard } from "../../../user/guards/user.guard";

@Component({
  selector: 'app-art-item',
  templateUrl: './art-item.component.html',
  styleUrls: ['./art-item.component.css'],
})
export class ArtItemComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private guard: AuthGuard
  ) {}

  auth = this.guard;
  @Input() art: Art;
  @Input() index: number;
  @Input() artsImg:any = []
  
  ngOnInit(){ 
    // console.log(this.artsImg)
    
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [
      {
          small: this.artsImg,
          medium: this.artsImg,
          big: this.artsImg
      }
    ];
  }

}
