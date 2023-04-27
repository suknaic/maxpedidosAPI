import { IDateProvider } from '../model/IDateProvider';

export class DateProviderMock implements IDateProvider {
  expiresInDay(number: number): number {
    return new Date().setDate(new Date().getDate() + number);
  }
  dateIsValid(number: number): boolean {
    const dateToCompare = new Date(number * 1000);
    const currentDate = new Date();

    if (dateToCompare >= currentDate) {
      return true;
    } else {
      return false;
    }
  }
  expiresToken(number: number): number {
    const date = new Date();
    // adiciona 15 minutos
    date.setMinutes(date.getMinutes() + number);

    //converter para o formato UNIX
    const unixTime = Math.floor(date.getTime() / 1000);

    return unixTime;
  }

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

const dateProvider = new DateProviderMock();

console.log(dateProvider.expiresInDay(5));
