import { Component, Input, OnInit } from '@angular/core';
import {Faq} from '../../_models';

@Component({
  selector: 'app-administration-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() questionsList: Faq[];
  @Input() tableLoading: boolean;

  cols: any[];

  constructor() {
  }

  //////////////

  ngOnInit() {
    this.setInitialVaribles();
  }

  //////////////

  setInitialVaribles() {
    this.cols = [
      { field: 'questionLabel', header: 'Questions' },
      { field: 'responseLabel', header: 'Réponses' },
      { field: 'tags', header: 'Tags' },
    ];
  }

  //////////////

}
