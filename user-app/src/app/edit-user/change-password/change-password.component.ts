import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ResolverService } from './../../services/resolver.service';
import { UserModel } from './../../models/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;
  @Input() userId: string;
  @Output() closeEditPassword = new EventEmitter<boolean>();
  @Output() newPassword = new EventEmitter<string>();
  passwordForm: FormGroup;
  notificationText: string;
  notificationSuccess: boolean;
  showNotification = false;
  updateFailed = false;
  updateSuccess = false;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private resolverService: ResolverService,
  ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      firstPassword: ['', Validators.required],
      secondPassword: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  savePassword() {
    const firstPassword = this.passwordForm.get('firstPassword').value;
    const secondPassword = this.passwordForm.get('secondPassword').value;
    const oldPassword = this.passwordForm.get('oldPassword').value;

    if (
      firstPassword === secondPassword &&
      oldPassword === this.user.password
    ) {
      this.subs = this.resolverService.updateUser(
        { password: firstPassword },
        this.userId
      )
        .subscribe(
          () => {
            this.newPassword.emit(firstPassword);
            this.notificationSuccess = true;
            this.showNotification = true;
            this.notificationText = 'Password successfully changed.';
            setTimeout(() => {
              this.closeEditPassword.emit(true);
              this.showNotification = false;
            }, 2000);
          },
          () => { this.showErrorOnFaildeUpdate(); }
        );

    } else {
      this.showErrorOnFaildeUpdate();
    }
  }

  showErrorOnFaildeUpdate() {
    this.showNotification = true;
    this.notificationText = 'Password is incorrect.';
    setTimeout(() => {
      this.showNotification = false;
      this.notificationSuccess = false;
    }, 2000);
  }

  closeCard() {
    this.closeEditPassword.emit(true);
  }
}
