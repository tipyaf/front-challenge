import {Component, OnInit, ViewChild} from '@angular/core';
import {FaqService} from '../_shared/services/faq.service';
import {ToastrService} from 'ngx-toastr';
import {Faq} from '../_models';
import {AddComponent} from './add/add.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  @ViewChild(AddComponent) addComponent;

  questionsList: Faq[] = [];
  isTableLoading: boolean;
  isAddButtonLoading: boolean;

  constructor(private faqService: FaqService,
              private toastr: ToastrService,
  ) {
  }

  //////////////

  ngOnInit() {
    this.setInitialVariables();
    this.getQuestionsList();
  }

  //////////////

  // -- variables to init -- /

  setInitialVariables() {
    this.isTableLoading = false;
    this.isAddButtonLoading = false;
  }

  //////////////

  // -- Datas -- /

  getQuestionsList() {
    this.questionsList = [];
    this.startTableLoading();

    this.faqService.getAll()
      .subscribe(list => {
          this.whenSuccessGetQuestionsList(list);
        },
        () => {
        // on error
          this.whenErrorGetQuestionsList();
        });
  }

  createQuestion(questionToAdd) {

    this.startAddButtonLoading();

    // // add question to db with faqService
    this.faqService.add(questionToAdd)
      .subscribe(question => {

          this.whenSuccessAdd(question);
          this.stopAddButtonLoading();

        },
        () => {
          // on error
          this.whenErrorAdd(questionToAdd);
          this.stopAddButtonLoading();
        });
  }

  //////////////////

  // -- datas responses actions -- /

  whenSuccessGetQuestionsList(list) {
    list.map(question => {
      this.questionsList.push(question);
    });
    this.stopTableLoading();
  }

  whenErrorGetQuestionsList() {
    this.stopTableLoading();
    this.toastr.error(`Une erreur est survenue lors du chargement de la liste de questions.`, 'Questions non disponibles');
  }

  whenSuccessAdd(question) {
    this.addNewQuestionToTable(question);
    this.resetAddForm();
    this.toastr.success(`La question "${question.questionLabel}" a été ajoutée.`, 'Question ajoutée !');
  }

  whenErrorAdd(question) {
    this.toastr.error('Non ajoutée', `Une erreur est survenue lors de l'ajout de la question "${question.questionLabel}".Veuillez réesseayer`);
  }

  ////////////////

  // -- view actions -- /

  // - add tab - /
  resetAddForm() {
    this.addComponent.addFormComponent.addForm.reset();
  }

  // - list tab - /
  addNewQuestionToTable(newQuestion) {
    this.questionsList.push(newQuestion);
  }



  ///////////////

  // -- loaders -- /

  startAddButtonLoading() {
    this.isAddButtonLoading = true;
  }

  stopAddButtonLoading() {
    this.isAddButtonLoading = false;
  }

  startTableLoading() {
    this.isTableLoading = true;
  }

  stopTableLoading() {
    this.isTableLoading = false;
  }

}
