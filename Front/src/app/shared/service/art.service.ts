import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Art } from '../art.model';

@Injectable()
export class ArtService {

  artChanged = new Subject<Art[]>();
  private arts: Art[] = [];

  setArts(arts: Art[]) {
    this.arts = arts;
    this.artChanged.next(this.arts.slice());
  }

  getArts() {
    return this.arts.slice();
  }

  getArt(index: number) {
    return this.arts.filter(found => 
      {
        if(found.id == index)
          return found
      });
  }

  addArt(art: Art) {
    this.arts.push(art);
    this.artChanged.next(this.arts.slice());
  }

  updateArt(index: number, newArt: Art) {
    this.arts[index] = newArt;
    this.artChanged.next(this.arts.slice());
  }

  deleteArt(index: number) {
    this.arts.splice(index, 1);
    this.artChanged.next(this.arts.slice());
  }
}
