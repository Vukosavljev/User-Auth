import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserObserverService } from '../services/user.observer.service';
import { ResolverService } from '../services/resolver.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  subsctiption = new Subscription();
  isPasswordChanged = false;
  userId: string;
  userForm: FormGroup;

  constructor(
    private resolverService: ResolverService,
    private userObserverService: UserObserverService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

    this.subsctiption.add(
      this.userObserverService.user$
        .subscribe((user: UserModel) => {
          this.userId = user._id;
          Object.keys(user).forEach(key => {
            if (this.userForm.controls[key]) {
              this.userForm.get(key).patchValue(user[key], { emitEvent: false });
            }
          });
        }));
  }

  ngOnDestroy(): void {
    this.subsctiption.unsubscribe();
  }

  initForm() {
    this.userForm = this.fb.group({
      userName: [{
        value: '',
        disabled: true,
      }, Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      postNumber: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  saveChanges() {
    if (this.userForm.dirty) {
      const { userName, password, firstName, lastName, address, postNumber, city } = this.userForm.value;

      this.resolverService.updateUser({
        userName, password, firstName, lastName, address, postNumber, city
      }, this.userId)
        .subscribe();
    }
  }

  getNewPassword(newPass: string) {
    this.userForm.get('password').patchValue(newPass, { emitEvent: false });
  }

  changePassword() {
    this.isPasswordChanged = true;
  }

  closePasswordCard() {
    this.isPasswordChanged = false;
  }
}
