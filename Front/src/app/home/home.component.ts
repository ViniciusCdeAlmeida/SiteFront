import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contactForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    console.log(this.contactForm.value)
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let contactName = '';
    let contactTitle = '';
    let contactEmail = '';
    let contactMenssage = '';

    /* ONDE GRAVA NO JSON */
    this.contactForm = new FormGroup({
      'name': new FormControl(contactName, Validators.required),
      'messageSub': new FormControl(contactTitle, Validators.required),
      'email': new FormControl(contactEmail, Validators.required),
      'text': new FormControl(contactMenssage, Validators.required)
    });
  }

}
