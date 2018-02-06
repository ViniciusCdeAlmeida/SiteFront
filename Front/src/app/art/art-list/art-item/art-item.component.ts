import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Art } from '../../../shared/art.model';
import { ArtService } from '../../../shared/service/art.service';
import { StorageService } from '../../../shared/service/storage.service'
import { MaterializeDirective } from "angular2-materialize";

import { AuthGuard } from "../../../user/guards/user.guard";

@Component({
  selector: 'app-art-item',
  templateUrl: './art-item.component.html',
  styleUrls: ['./art-item.component.css'],
  providers: [StorageService]
})
export class ArtItemComponent implements OnInit {
  arts: Art[];
  subscription: Subscription;
  id: number;
  auth = this.guard
  page:any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private artService: ArtService,
    private guard: AuthGuard
    ){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.storageService.getArts()
    });
    this.artService.artChanged.subscribe((artss: Art[]) => {this.arts = artss;});
    
  }

  onNewArt() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
