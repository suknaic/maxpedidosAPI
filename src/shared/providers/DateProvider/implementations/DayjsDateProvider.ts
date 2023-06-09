import * as dayjs from 'dayjs';
import { IDateProvider } from '../model/IDateProvider';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export class DayjsDateProvider implements IDateProvider {
  dateIsValid(number: number): boolean {
    return dayjs().isAfter(dayjs.unix(number));
  }
  expiresInDay(number: number): number {
    return dayjs().add(number, 'd').unix();
  }
  expiresInHours(hour: number): number {
    return dayjs().add(hour, 'hour').unix();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().tz('America/Rio_Branco').format('HH:mm');
  }

  addHours(hours: string): Date {
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; // regex para validar o formato 'HH:mm'

    if (!timeRegex.test(hours)) {
      throw new Error(
        'Formato da Hora está Errado. Por Favor use o formato "HH:mm".',
      );
    }

    const [hour, minute] = hours.split(':');
    const currentDate = dayjs(); // data atual
    const newDate = currentDate
      .set('hour', Number(hour))
      .set('minute', Number(minute));
    return newDate.toDate();
  }
}
