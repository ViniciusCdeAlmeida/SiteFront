import { Component, OnInit, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';

import {Art} from '../../../shared/art.model'
import { Angular2TokenService } from "angular2-token";


@Component({
  selector: 'app-art-item',
  templateUrl: './art-item.component.html',
  styleUrls: ['./art-item.component.css'],
})
export class ArtItemComponent implements OnInit {

  constructor(
    public tokenGuard: Angular2TokenService
  ) { }

  @Input() art: Art;
  @Input() index: number;
  
  

  ngOnInit() {}

}
