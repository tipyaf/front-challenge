import {Component, OnInit} from '@angular/core';
import { FaqService } from '../_shared/services/data/faq.service';
import {Faq} from '../_models/index';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {AuthenticationService} from '../_shared/services/authentication.service';
import {ErrorsHandlerService} from '../_shared/services/errors/errors-handler.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  questionsList: Faq[];
  inputSearch: string;
  isLoading: boolean;
  isConnected: boolean;

  constructor(private faqService: FaqService,
              private toastr: ToastrService,
              private authentication: AuthenticationService,
              private errorService: ErrorsHandlerService
  ) {
  }

  //////////////

  ngOnInit() {
    this.startLoading();
    this.getQuestionsList();
    this.isConnected = this.authentication.getIsConnected();

  }

  //////////////

  getQuestionsList() {
    let cachedQuestionsList = this.faqService.getFaq(); // get cached list
    let hasCachedQuestionsList = !_.isEmpty(cachedQuestionsList); // verify if list is already cached
    if (hasCachedQuestionsList) {
      // if cached set all needed
      this.whenSuccessGetQuestionsList(cachedQuestionsList);
    } else {
      // load datas by service that load and cached datas
      this.loadFaq();
    }
  }

  // call service to load FAQ
  loadFaq() {
    this.startLoading();

    this.questionsList = []; // init variable

    this.faqService.loadFaq()
      .subscribe(faqList => {
          this.whenSuccessGetQuestionsList(faqList);
        },
        (error) => {
          // on error
          this.whenErrorGetQuestionsList(error);
        });
  }

  /////////////


  // -- datas responses actions -- /

  whenSuccessGetQuestionsList(faqList) {
    this.questionsList = faqList; // set list
    this.stopLoading();
  }

  whenErrorGetQuestionsList(error) {
    this.questionsList = []; // set empty list
    this.toastr.error(`Une erreur est survenue lors du chargement de la liste de questions.`, 'Questions non disponibles'); // show error message
    this.stopLoading();
    this.errorService.catch(error);
  }

  ///////////////

  onDeconnect() {
    this.isConnected = false;
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
