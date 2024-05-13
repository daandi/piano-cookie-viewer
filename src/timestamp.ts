export function humanReadableTimestamp(timestamp: number, locale: undefined | string): string {
    const dateTime = new Date(timestamp);
    return dateTime.toLocaleString(locale ? locale : 'en-UK');
}