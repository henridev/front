export default class DateTimeService {

  public isoDateParser(
    isoString: string,
    isTest: boolean
  ): RegExpExecArray | null | boolean {
    return isTest
      ? /(\d{4}-\d{2}-\d{2})[A-Z]+(\d{2}:\d{2}:\d{2}).([0-9+-:]+[A-Z])/.test(
          isoString
        )
      : /(\d{4}-\d{2}-\d{2})[A-Z]+(\d{2}:\d{2}:\d{2}).([0-9+-:]+[A-Z])/.exec(
          isoString
        );
  }
}
