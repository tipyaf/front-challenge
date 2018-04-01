import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '../_shared/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLoading: Boolean;
  public loginForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
              // private alertService: AlertService
  ) {
  }

  //////////////

  ngOnInit() {
    this.resetLoginStatus();
    this.stopLoading();
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'change'
      })
    });
  }

  //////////////

  login() {
    this.startLoading();
    this.authenticationService.login('admin', 'admin')
      .subscribe(
        (e) => {
          this.router.navigate(['/home']);
        },
        error => {
          // todo add alert primeng message
          this.stopLoading();
        });
  }

  //////////////

  resetLoginStatus() {
    this.authenticationService.logout();
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
