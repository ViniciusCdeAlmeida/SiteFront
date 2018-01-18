import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Angular2TokenService} from "angular2-token";

import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  signInUser = {
    email: '',
    password: ''
  };

  @Output() onFormResult = new EventEmitter<any>();
  constructor(private tokenAuthSerivce:Angular2TokenService, private router: Router, private route: ActivatedRoute){};

  ngOnInit() {
  }

  onSignInSubmit(){
    
    this.tokenAuthSerivce.signIn(this.signInUser).subscribe(
    
      res => { this.signInUser})
      this.onCancel();
    
}

onCancel() {
  this.router.navigate(['../'], { relativeTo: this.route });
}
}