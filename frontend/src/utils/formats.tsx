export function getDateTime(timeStr: string): string {
  const date = new Date(timeStr);
  let currentDateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const Today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  currentDateStr = currentDateStr === Today ? 'Today' : currentDateStr;
  const currentTimeStr = date.toLocaleTimeString('en-US', {
    minute: '2-digit',
    hour: '2-digit',
  });

  return `${currentDateStr} at ${currentTimeStr}`;
}
