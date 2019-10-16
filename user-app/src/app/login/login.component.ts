import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserObserverService } from './../services/user.observer.service';
import { UserModel } from './../models/user.model';
import { ResolverService } from '../services/resolver.service';
import { CredentialsModel } from './../models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  logInForm: FormGroup;
  invalidUser = false;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private resolverService: ResolverService,
    private userObserverService: UserObserverService) { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    const credentials: CredentialsModel = {
      userName: this.logInForm.value.userName,
      password: this.logInForm.value.password,
    };

    const loginsub = this.resolverService.loginUser(credentials)
      .subscribe(
        (user: UserModel | null) => {
          if (user === null) {
            this.invalidUser = true;
            setTimeout(() => {
              this.invalidUser = false;
            }, 2000);
            return;
          }
          this.invalidUser = false;
          this.router.navigate(['/user-details']);
          this.userObserverService.userLoged(user as UserModel);
        }
      );

    this.subscription.add(loginsub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
