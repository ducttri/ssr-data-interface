export function formatDate(date: Date): string {
  const year: string = date.getFullYear().toString(); // %Y

  // Calculate the day of the year (%j)
  const start: Date = new Date(date.getFullYear(), 0, 0);
  const diff: number = date.getTime() - start.getTime();
  const oneDay: number = 1000 * 60 * 60 * 24;
  const dayOfYear: string = Math.floor(diff / oneDay)
    .toString()
    .padStart(3, "0"); // %j

  const hours: string = date.getHours().toString().padStart(2, "0"); // %H
  const minutes: string = date.getMinutes().toString().padStart(2, "0"); // %M
  const seconds: string = date.getSeconds().toString().padStart(2, "0"); // %S

  return `${year}-${dayOfYear}-${hours}-${minutes}-${seconds}`;
}
