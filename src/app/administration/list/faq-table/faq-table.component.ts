import {Component, Input, OnInit} from '@angular/core';
import { Faq } from '../../../_models/index';

@Component({
  selector: 'app-administration-list-table',
  templateUrl: './faq-table.component.html'
})
export class FaqTableComponent implements OnInit {
  @Input() list: Faq[];
  @Input() loading: boolean;

  cols: any[];

  //////////////

  ngOnInit() {
    this.setInitialVariables();
  }

  //////////////

  setInitialVariables() {
    // table  columns
    this.cols = [
      {field: 'questionLabel', header: 'Questions'},
      {field: 'tags', header: 'Tags'}
    ];
  }

  //////////////

}
