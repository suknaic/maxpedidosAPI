import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../model/IDateProvider';

export class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format('HH:mm');
  }
  addHours(hours: string): Date {
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; // regex para validar o formato 'HH:mm'

    if (!timeRegex.test(hours)) {
      throw new Error(
        'Formato de Hora Errado. Por Favor use o formato "HH:mm".',
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
