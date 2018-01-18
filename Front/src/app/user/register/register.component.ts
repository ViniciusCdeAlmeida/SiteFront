import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Angular2TokenService } from "angular2-token";

import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(private tokenAuthSerivce:Angular2TokenService, private router: Router) { }

  ngOnInit() {}


  onSignUpSubmit(){
    // console.log(this.signUpUser);
    this.tokenAuthSerivce.registerAccount(this.signUpUser).subscribe(
        (res) => {this.signUpUser})
    this.router.navigate(['/home']);
  }  

}
