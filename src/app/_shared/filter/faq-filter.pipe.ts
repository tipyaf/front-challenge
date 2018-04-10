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
      let myInput = _.toLower(input);

      return questionList.filter(question => {
        // formatting data values
        let questionLabel = _.toLower(question.questionLabel);
        let tags = _.toLower(_.replace(_.map(question.tags).join(','), ',', ''));
        console.log(questionLabel, tags, _.includes(questionLabel, myInput),  _.includes(tags, myInput));
        // filter
        return _.includes(questionLabel, myInput) || _.includes(tags, myInput);
      });
    } else {
      // if input is empty return question list
      return questionList;
    }
  }

}
