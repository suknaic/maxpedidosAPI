export abstract class IDateProvider {
  abstract convertToUTC(date: Date): string;
  abstract addHours(hours: string): Date;
  abstract expiresInDay(number: number): number;
  abstract expiresInHours(number: number): number;
  abstract dateIsValid(number: number): boolean;
}
