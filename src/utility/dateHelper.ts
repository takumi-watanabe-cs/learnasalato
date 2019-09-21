import * as moment from 'moment'

export class DateHelper {
  static convertToDate(strDate: string) {
    const date = moment(new Date(strDate)).format("MMM Do, YYYY"); // → "Sep 2nd 07"
    return date;
  }
}
