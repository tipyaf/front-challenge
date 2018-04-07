import { Injectable } from '@angular/core';
import { Faq } from '../../../_models/index';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FaqService {
  faqList: Faq[] = [];

  constructor(private http: HttpClient) {
  }

  loadFaq() {
    return this.http.get<Faq[]>('/api/questions')
      .map(faqList => {
        this.setFaq(faqList);
        return faqList;
      });
  }

  add(question: Faq): Observable<Faq> {
    return this.http.post<Faq>('/api/question', question)
      .map(question => question)
      .map(question => {
        // add to cached Faq (on the top of list)
        this.faqList.unshift(question);
        return question;
      });
  }

  setFaq(faqList) {
    this.faqList = faqList;
  }

  getFaq() {
    return this.faqList;
  }

}
