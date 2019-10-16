import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserModel } from './../models/user.model';
import { ResolverService } from '../services/resolver.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  private subs = new Subscription();
  newUserForm: FormGroup;
  showNotification = false;
  notificationSuccess: boolean;
  notificationText: string;

  constructor(
    private fb: FormBuilder,
    private resloverService: ResolverService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.newUserForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      postNumber: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  saveNewUser() {
    const newUserSub = this.resloverService.addUser(this.newUserForm.value)
      .subscribe(
        (user: UserModel) => {
          this.notificationSuccess = true;
          this.showNotification = true;
          this.notificationText = 'You successfully added new user.';
          this.removeNotification();
        },
        error => {
          this.notificationSuccess = false;
          this.showNotification = true;
          this.notificationText = 'You have not add new user, please try again later.';
          this.removeNotification();
        }
      );
    this.subs.add(newUserSub);
  }

  removeNotification() {
    setTimeout(() => {
      this.showNotification = false;
    }, 2000);
  }
}
