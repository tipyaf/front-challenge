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
  public isLoading: boolean;
  public loginForm: FormGroup;
  public errorMessage: boolean;
  public isError: boolean;
  public isForgivenPassword: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  //////////////

  ngOnInit() {
    this.setLoginForm();

    // prevent init
    this.resetLoginStatus();
    this.hideAlertError();
  }

  //////////////

  login() {
    this.startLoading(); // show spinner
    this.hideAlertError(); // hide alert eventually
    // lo
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        user => {
          if (user.admin) {
            // if administration go to administration page
            this.router.navigate(['/administration']);
          } else {
            this.router.navigate(['/faq']);
          }
        },
        () => {
          // on error
          this.showAlertError('Identifiant ou mot de passe incorrect');
          this.stopLoading();
        });
  }

  //////////////

  onForgivenPassword() {
    this.isForgivenPassword = true;
  }

  onInputsChange() {
    this.isError = false;
  }

  /////////////

  setLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  resetLoginStatus() {
    this.authenticationService.logout();
  }

  showAlertError(message) {
    this.isError = true;
    this.errorMessage = message;
  }

  hideAlertError() {
    this.isError = false;
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
