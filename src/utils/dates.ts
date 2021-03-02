import moment from 'moment-timezone';
import dotenv from 'dotenv';

enum DateFormat {
  backend = 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  date = 'DD.MM.YYYY',
  isoDate = 'YYYY-MM-DD',
  datetime = 'DD.MM.YYYY HH:mm',
  hourTime = 'mm:ss',
  invertedDate = 'YYYY-MM-DD',
  invertedDatetime = 'YYYY-MM-DD HH:mm:ss',
  time = 'HH:mm:ss',
  timeHours = 'HH:mm',
  yearMonth = 'YYYY.MM',
}

dotenv.config({
  path: './config/config.env'
})

const BACKEND_TIMEZONE = String(process.env.TIMEZONE);

function dateWithCurrentTimeZone(format: string = DateFormat.backend): string {
  return moment.tz(Date.now(), BACKEND_TIMEZONE).format(format);
}

function convertDateFromTimestamp(date: string | number, toFormat: string = DateFormat.backend,): string {
  return date
    ? String(moment.unix(<number>date).format(toFormat))
    : '';
}

function isDate(str: string): boolean {
  return moment(str, moment.ISO_8601).isValid();
}

export {
  DateFormat,
  convertDateFromTimestamp,
  dateWithCurrentTimeZone,
  isDate,
};