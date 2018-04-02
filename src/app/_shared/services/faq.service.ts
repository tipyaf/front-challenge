import { Injectable } from '@angular/core';
import { Faq } from '../../_models';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FaqService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Faq[]>('/api/questions');
  }

  getById(id: number) {
    return this.http.get('/api/question/' + id);
  }

  add(question: Faq) {
    return this.http.post<Faq[]>('/api/question', question);
  }

}
