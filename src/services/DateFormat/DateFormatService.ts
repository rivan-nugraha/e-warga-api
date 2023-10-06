import * as moment from "moment-timezone";

export default class DateFormatService {
  private _months = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];

  localDateTime() {
    const date = moment
      .tz(new Date(), "Asia/Jakarta")
      .format("YYYY-MM-DD HH:mm:ss");
    return date;
  }

  localDate() {
    const date = moment.tz(new Date(), "Asia/Jakarta").format("YYYY-MM-DD");
    return date;
  }

  localDateString(date: string | Date) {
    const tanggal = date ? new Date(date) : new Date();
    return moment.tz(tanggal, "Asia/Jakarta").format("YYYY-MM-DD");
  }

  localDateStringSecondFormat(date: string | Date) {
    const tanggal = date ? new Date(date) : new Date();
    return moment.tz(tanggal, "Asia/Jakarta").format("YYYYMMDD");
  }

  localDateStringIndonesia(date: string | Date) {
    const tanggal = date ? new Date(date) : new Date();
    return moment.tz(tanggal, "Asia/Jakarta").format("DD-MM-YYYY");
  }

  getYear(){
    const tanggal = new Date();
    const converted = moment.tz(tanggal, "Asia/Jakarta").format("DD-MM-YYYY");
    const splitted = converted.split("-");
    return splitted[2];
  }

  getMonth(date?: string | Date) {
    const tanggal = date ? new Date(date) : new Date();
    const converted = moment.tz(tanggal, "Asia/Jakarta").format("DD-MM-YYYY");
    const splited = converted.split("-")[1];
    const toNumber = Number(splited);
    const month = this._months[toNumber - 1];
    return month;
  }
}
