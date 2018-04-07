import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  tabs: MenuItem[];

  constructor(private router: Router) {
  }
  //////////////

  ngOnInit() {
    this.setInitialVariables();
  }

  //////////////

  // -- variables to init -- /

  setInitialVariables() {
    // set menu tabs
    this.tabs = [
      {label: 'Liste des questions', icon: 'fa-list', routerLink: 'list'},
      {label: 'Ajouter une question', icon: 'fa-pencil-square-o', routerLink: 'add'}
    ];
    }

  //////////////

  onDeconnect() {
    this.router.navigate(['/faq']); // on log out go to Faq
  }

}
