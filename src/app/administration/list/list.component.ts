import {Component, OnInit} from '@angular/core';
import {Faq} from '../../_models';
import {FaqService} from '../../_shared/services/data/faq.service';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {ErrorsHandlerService} from '../../_shared/services/errors/errors-handler.service';

@Component({
  selector: 'app-administration-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  questionsList: Faq[];
  isTableLoading: boolean;
  inputSearch: string;

  constructor(private faqService: FaqService,
              private toastr: ToastrService,
              private errorService: ErrorsHandlerService

  ) {
  }

  //////////////

  ngOnInit() {
    this.setInitialVariables();
    this.getQuestionsList();
  }

  //////////////

  setInitialVariables() {
    this.isTableLoading = false;
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
    this.startTableLoading();

    this.questionsList = []; // init variable

    this.faqService.loadFaq()
      .subscribe(faqList => {
          this.whenSuccessGetQuestionsList(faqList);
        },
        error => {
          // on error
          this.whenErrorGetQuestionsList(error);
        });
  }

  /////////////


  // -- datas responses actions -- /

  whenSuccessGetQuestionsList(faqList) {
    this.questionsList = faqList; // set list
    this.stopTableLoading();

  }

  whenErrorGetQuestionsList(error) {
    this.questionsList = []; // set empty list
    this.toastr.error(`Une erreur est survenue lors du chargement de la liste de questions.`, 'Questions non disponibles'); // show error message
    this.stopTableLoading();
    this.errorService.catch(error); // handle error in service
  }

  /////////////

  // -loaders - /

  startTableLoading() {
    this.isTableLoading = true;
  }

  stopTableLoading() {
    this.isTableLoading = false;
  }

}
