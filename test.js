import moment from 'moment-timezone';
import Exception from './src/exceptions/Exception.js';
import { Error } from 'mongoose';

class DateStrFormat {
    static DATE = 'DD-MM-YYYY';
    static DATE_AND_TIME = 'DD-MM-YYYY hh:mm';
}

const dateTimeInputFormat = (date, dateStFrormat) => {
    let dateFormat = moment(date, dateStFrormat).tz('Asia/Ho_Chi_Minh').utc().format();
    return (
        (/^(\d{2}-\d{2}-\d{4})+( \d{2}:\d{2})?$/.test(date) &&
            (DateStrFormat.DATE === dateStFrormat || DateStrFormat.DATE_AND_TIME === dateStFrormat) &&
            dateFormat !== 'Invalid date' &&
            dateFormat) ||
        null
    );
};

const dateTimeOutputFormat = (date, dateStFrormat) => {
    let dateFormat = moment(date).tz('Asia/Ho_Chi_Minh').format(dateStFrormat);
    return (
        ((DateStrFormat.DATE === dateStFrormat || DateStrFormat.DATE_AND_TIME === dateStFrormat) &&
            dateFormat !== 'Invalid date' &&
            dateFormat) ||
        null
    );
};

let date = dateTimeInputFormat('10-02-2022 10:00', 'kksk');
console.log(date);
console.log(dateTimeOutputFormat(date, 'kskks'))
