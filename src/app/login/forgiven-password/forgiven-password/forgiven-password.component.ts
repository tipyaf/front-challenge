import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_shared/services/authentication.service';

@Component({
  selector: 'app-login-forgiven-password',
  templateUrl: './forgiven-password.component.html',
  styleUrls: ['./forgiven-password.component.css']
})
export class ForgivenPasswordComponent implements OnInit {
  @Input() isDisplay: boolean;
  @Output() isDisplayChange = new EventEmitter();

  public forgivenForm: FormGroup;
  public isSendError: boolean;
  public isSendSuccess: boolean;

  constructor(private authentication: AuthenticationService) {
  }

  //////////////

  ngOnInit() {
    this.setInitialVariables();
    this.setForgivenForm();
  }

  //////////////

  setForgivenForm() {
    this.forgivenForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  setInitialVariables() {
    this.isSendSuccess = false;
    this.isSendError = false;
  }

  //////////////

  send() {
    this.authentication.resetPassword(this.forgivenForm.value.email)
      .subscribe(() => {
          this.sendSuccess();
        },
        () => {
          this.sendError();
        });
  }

  sendSuccess() {
    this.isSendError = false;
    this.isSendSuccess = true;
  }

  sendError() {
    this.isSendSuccess = false;
    this.isSendError = true;
  }

  close() {
    this.isDisplay = false;
    this.isDisplayChange.emit(false);
  }


}
