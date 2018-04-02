import { Component, Input } from '@angular/core';
import { Faq } from '../../../_models/index';

@Component({
  selector: 'app-administration-list-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() list: Faq[];
  @Input() cols: any[];
  @Input() loading: boolean;

  constructor() {
  }


}
