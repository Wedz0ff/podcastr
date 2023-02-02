export function convertDurationToSeconds(time: any) {
  const [hours, minutes, seconds] = time.split(':');

  return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
}
