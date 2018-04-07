import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '../_shared/services/authentication.service';
import {ErrorsHandlerService} from '../_shared/services/errors/errors-handler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  loginForm: FormGroup;
  errorMessage: boolean;
  isError: boolean;
  isForgivenPassword: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private errorService: ErrorsHandlerService
  ) {
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
    // authenticate
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        user => {
          // on success
          this.whenLoginSuccess(user);
        },
        (error) => {
          // on error
          this.whenLoginError(error);
        });
  }

  //////////////////

  // -- datas responses actions -- /

  whenLoginSuccess(user) {
    // check role
    if (user.admin) {
      this.router.navigate(['/administration']); // if administration role go to administration page
    } else {
      this.router.navigate(['/faq']); // other connected users go to faq page
    }
    // remove spinner
    this.stopLoading();
  }

  whenLoginError(error) {
    this.showAlertError('Identifiant ou mot de passe incorrect'); // show message error in form container
    this.stopLoading(); // remove spinner
    this.errorService.catch(error); // handle error in service
  }

  //////////////

  onForgivenPassword() {
    this.isForgivenPassword = true; // display modal forgiven password
  }

  onInputsChange() {
    this.hideAlertError(); // remove error alert on keypress
  }

  /////////////

  setLoginForm() {
    // create FormGroup form with validators
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
