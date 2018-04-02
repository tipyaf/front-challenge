import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-administration-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  public addForm: FormGroup;

  constructor() {
  }

  //////////////

  ngOnInit() {
    this.setAddForm();
  }

  //////////////

  setAddForm() {
    this.addForm = new FormGroup({
      questionLabel: new FormControl('', [Validators.required, Validators.minLength(10)]),
      responseLabel: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tags: new FormControl('')
    });
  }

}
