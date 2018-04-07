import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-shared-component-connexions-controls',
  templateUrl: './connexions-controls.component.html'
})
export class ConnexionsControlsComponent implements OnInit {
  @Output() deconnect = new EventEmitter();


  actions: any;
  selectedAction: any;
  isConnected: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router
  ) {
  }

  //////////////

  ngOnInit() {
    this.setInitialVariables();
    this.selectAction();
  }

  //////////////

  // -- variables to init -- /

  setInitialVariables() {
    this.actions = {
      identify: { label: `S'identifier`, icon: 'fa fa-sign-in' , cssClass: 'ui-button-success', click: () => { this.navigateToLogin(); } },
      logout: { label: `Se déconnecter`, icon: 'fa fa-sign-out' , cssClass: 'ui-button-secondary', click: () =>  { this.logout(); } },
    };
    this.isConnected = false;
  }

  //////////////

  selectAction() {
    this.isConnected = this.authenticationService.getIsConnected();
    this.selectedAction = this.isConnected ? this.actions.logout : this.actions.identify;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authenticationService.logout();
    this.isConnected = false;
    this.selectAction();
    this.deconnect.emit();
  }

}
