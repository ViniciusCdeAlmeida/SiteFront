import { Component, OnInit } from '@angular/core';

import { AuthGuard } from "../user/guards/user.guard";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
   private guard: AuthGuard
  ) { }

  auth = this.guard

  ngOnInit() {
  }

}
