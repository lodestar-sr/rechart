export const formatTimezoneOffset = (offset) => {
  const positive = offset >= 0;
  offset = Math.abs(offset);
  const h = Math.floor(offset / 60);
  const m = offset % 60;
  return `GMT ${positive ? '+' : '-'}${h < 10 ? '0' : ''}${h}${m < 10 ? '0' : ''}${m}`;
};
