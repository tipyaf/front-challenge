import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AddFormComponent} from './add-form/add-form.component';

@Component({
  selector: 'app-administration-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @ViewChild(AddFormComponent) addFormComponent;

  @Input() isLoading: boolean;

  @Output() addQuestion = new EventEmitter();


  constructor() {
  }

  onAddQuestion() {
    const questionToAdd = {
      questionLabel: this.addFormComponent.addForm.value.questionLabel,
      responseLabel: this.addFormComponent.addForm.value.responseLabel,
      tags: this.addFormComponent.addForm.value.tags
    };

    this.addQuestion.emit(questionToAdd);

  }

}
