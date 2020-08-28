import DateTimeService from "../utils/dateTime";

/**
 * convertir l'objet date en string lisible
 * @param date - date de nettoyage la plus récente
 * @returns - date en format dd/mm/yyyy et hh:mm
 */
export function usePipeToDateString() {
  const display = { calendar: "00/00/0000", clock: "00.00" };
  function pipeToReadableDate(
    date: Date | undefined
  ): { calendar: string; clock: string } {
    if (typeof date === "undefined") return display;

    const matches = new DateTimeService().isoDateParser(
      date.toISOString(),
      false
    ) as RegExpExecArray | null;
    if (!matches) return display;

    const calendar = matches[1].split("-").reverse().join("/");
    const clock = matches[2].slice(0, 5).replace(":", ".");
    return { calendar, clock };
  }

  return { pipeToReadableDate };
}
