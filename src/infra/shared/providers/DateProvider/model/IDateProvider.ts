export abstract class IDateProvider {
  abstract convertToUTC(date: Date): string;
  abstract addHours(hours: string): Date;
}
