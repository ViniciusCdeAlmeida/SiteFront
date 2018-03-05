import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environmentAuth} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environmentAuth.token_auth_config);
  }
}
