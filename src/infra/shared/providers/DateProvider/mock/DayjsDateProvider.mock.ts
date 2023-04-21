import { IDateProvider } from '../model/IDateProvider';

export class DateProviderMock implements IDateProvider {
  convertToUTC(date: Date): string {
    throw new Error('Method not implemented.');
  }
  addHours(horas: string): Date {
    const [hourStr, minStr] = horas.split(':');
    const hour = parseInt(hourStr, 10);
    const min = parseInt(minStr, 10);

    if (isNaN(hour) || isNaN(min)) {
      throw new Error('Invalid time Format');
    }

    const date = new Date();
    date.setHours(hour, min);
    return date;
  }
}
