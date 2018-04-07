import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-shared-component-faq-search',
  templateUrl: './faq-search.component.html',
  styleUrls: ['./faq-search.component.css']
})
export class FaqSearchComponent {
  @Input() model: string;
  @Output() modelChange: EventEmitter<string>  = new EventEmitter();
  @Input() label: string;

  onchange(value) {
    this.modelChange.emit(value);
  }

}
