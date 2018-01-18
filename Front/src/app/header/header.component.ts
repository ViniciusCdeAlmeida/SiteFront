import { Component, OnInit } from '@angular/core';

import { AuthGuard } from "../user/guards/user.guard";

import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
   private guard: AuthGuard,
   public tokenGuard: Angular2TokenService
  ) { }

  auth = this.guard

  ngOnInit() {
  }

}
