import {Component, OnInit, ViewChild} from '@angular/core';
import {AddFormComponent} from './add-form/add-form.component';
import {FaqService} from '../../_shared/services/data/faq.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorsHandlerService} from '../../_shared/services/errors/errors-handler.service';

@Component({
  selector: 'app-administration-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild(AddFormComponent) addFormComponent;

  isAddButtonLoading: boolean;

  constructor(private faqService: FaqService,
              private toastr: ToastrService,
              private errorService: ErrorsHandlerService
  ) {
  }

  //////////////

  ngOnInit() {
    this.setInitialVariables();
  }

  //////////////

  // -- variables to init -- /

  setInitialVariables() {
    this.isAddButtonLoading = false;
  }

  //////////////

  onAddQuestion() {
    // set value of form
    let questionToAdd = {
      questionLabel: this.addFormComponent.addForm.value.questionLabel,
      responseLabel: this.addFormComponent.addForm.value.responseLabel,
      tags: this.addFormComponent.addForm.value.tags
    };

    this.startAddButtonLoading();

    // // add question to db with faqService
    this.faqService.add(questionToAdd)
      .subscribe(question => {
        // on success
          this.whenSuccessAdd(question);
        },
        (error) => {
          // on error
          this.whenErrorAdd(questionToAdd, error);
        });
  }

  //////////////////

  // -- responses actions-- /

  whenSuccessAdd(questionAdded) {
    this.resetAddForm(); // remove forme values when is validated
    this.toastr.success(`La question "${questionAdded.questionLabel}" a été ajoutée.`, 'Question ajoutée !'); // show success message
    this.stopAddButtonLoading();
  }

  whenErrorAdd(questionAdded, error) {
    this.toastr.error(`La question: "${questionAdded.questionLabel}" n'a été ajoutée.`, 'Non ajoutée'); // error message
    this.stopAddButtonLoading();
    this.errorService.catch(error); // handle error in service
  }

  ///////////////

  resetAddForm() {
    this.addFormComponent.addForm.reset();
  }

  // -- loaders -- /

  startAddButtonLoading() {
    this.isAddButtonLoading = true;
  }

  stopAddButtonLoading() {
    this.isAddButtonLoading = false;
  }

}
