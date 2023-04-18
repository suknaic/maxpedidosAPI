import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../model/IDateProvider';

export class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format('HH:mm');
  }
  addHours(hours: string): Date {
    return dayjs(hours, 'HH:mm').toDate();
  }
}
