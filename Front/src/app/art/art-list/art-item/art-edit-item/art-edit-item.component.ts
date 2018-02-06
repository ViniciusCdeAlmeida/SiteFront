import { Component, OnInit, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Art} from '../../../../shared/art.model';

import { AuthGuard } from "../../../../user/guards/user.guard";
@Component({
  selector: 'app-art-edit-item',
  templateUrl: './art-edit-item.component.html',
  styleUrls: ['./art-edit-item.component.css']
})
export class ArtEditItemComponent implements OnInit {

  constructor(
    private guard: AuthGuard
  ) {}

  auth = this.guard;
  @Input() art: Art;
  @Input() index: number;
  
  ngOnInit(){}

}