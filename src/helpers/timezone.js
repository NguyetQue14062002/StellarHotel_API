import moment from 'moment-timezone';

class DateStrFormat {
    static DATE = 'DD-MM-YYYY';
    static DATE_AND_TIME = 'DD-MM-YYYY hh:mm';
}

const dateTimeInputFormat = async (date, dateStFrormat) => {
    return (
        /^(\d{2}-\d{2}-\d{4})+( \d{2}:\d{2})?$/.test(date) &&
        (DateStrFormat.DATE === dateStFrormat || DateStrFormat.DATE_AND_TIME === dateStFrormat) &&
        moment(date, dateStFrormat).tz('Asia/Ho_Chi_Minh').utc().format()
    );
};

const dateTimeOutputFormat = async (date, dateStFrormat) => {
    return (
        (DateStrFormat.DATE === dateStFrormat || DateStrFormat.DATE_AND_TIME === dateStFrormat) &&
        moment(date).tz('Asia/Ho_Chi_Minh').format(dateStFrormat).toString()
    );
};

export { DateStrFormat, dateTimeInputFormat, dateTimeOutputFormat };
