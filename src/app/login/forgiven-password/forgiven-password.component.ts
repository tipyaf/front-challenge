import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_shared/services/authentication.service';

@Component({
  selector: 'app-login-forgiven-password',
  templateUrl: './forgiven-password.component.html'
})
export class ForgivenPasswordComponent implements OnInit {
  @Input() isDisplay: boolean;
  @Output() isDisplayChange = new EventEmitter();

  forgivenForm: FormGroup;
  isSendBtnDisabled: boolean;
  message: string;

  constructor(private authentication: AuthenticationService) {
  }

  //////////////

  ngOnInit() {
    this.setInitialVariables();
    this.setForgivenForm(); // create FormGroup with validators
  }

  //////////////

  setForgivenForm() {
    this.forgivenForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  setInitialVariables() {
    this.isSendBtnDisabled = false;
    this.message = null;
  }

  //////////////

  send() {
    this.message = null;
    this.authentication.resetPassword(this.forgivenForm.value.email)
      .subscribe(() => {
        // on success
          this.sendSuccess();
        },
        () => {
          // on error
          console.log('rr');
          this.sendError();
        });
  }

  sendSuccess() {
    this.isSendBtnDisabled = true; // disabled button send
    this.message = 'success'; // show success message
    this.forgivenForm.reset(); // clear email in input
  }

  sendError() {
    this.isSendBtnDisabled = false; // enable button send
    this.message = 'error'; // show error message
  }

  close() {
    this.isSendBtnDisabled = false; // enable button send
    this.message = null; // init message
    this.forgivenForm.reset(); // clear email in input
    this.isDisplay = false; // set close
    this.isDisplayChange.emit(false); // emit to parent (login)
  }


}
