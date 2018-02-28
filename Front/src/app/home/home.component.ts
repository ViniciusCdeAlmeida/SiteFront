import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StorageService } from '../shared/service/storage.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StorageService]
})
export class HomeComponent implements OnInit {

  contactForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    // console.log(this.contactForm.get("messageSub").value)
    // console.log(this.contactForm.get("email").value)
    // console.log(this.contactForm.get("text").value)
    this.storageService.sendEmail(
      this.contactForm.get("email").value, 
      this.contactForm.get("messageSub").value, 
      this.contactForm.get("text").value)
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let contactTitle = '';
    let contactEmail = '';
    let contactMenssage = '';

    /* ONDE GRAVA NO JSON */
    this.contactForm = new FormGroup({
      'messageSub': new FormControl(contactTitle, Validators.required),
      'email': new FormControl(contactEmail, Validators.required),
      'text': new FormControl(contactMenssage, Validators.required)
    });
  }

}
