import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'faqSearchFilter'
})
export class FaqFilterPipe implements PipeTransform {

  transform(questionList: any, input?: string): any {
    // check if input is not empty
    if (!!input) {
      // formatting input
      let myInput = input.toLowerCase();

      return questionList.filter(question => {
        // formatting data values
        let questionLabel = question.questionLabel.toLowerCase();
        let tags = JSON.stringify(question.tags).toLowerCase();
        // create sting with 2 datas
        let concatedDatas = `${questionLabel}${tags}`;

        // filter
        return _.includes(concatedDatas, myInput);
      });
    } else {
      // if input is empty return question list
      return questionList;
    }
  }

}
