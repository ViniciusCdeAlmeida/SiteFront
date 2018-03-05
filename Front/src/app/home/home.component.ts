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
      this.storageService.sendEmail(this.contactForm.value).subscribe(data => this.contactForm.value); {}
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
      'subject': new FormControl(contactTitle, Validators.required),
      'email': new FormControl(contactEmail, Validators.required),
      'text': new FormControl(contactMenssage, Validators.required)
    });
  }

}
