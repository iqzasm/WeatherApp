export const getLocalTime = timezone => {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const localizedTime = utc + 1000 * timezone;

  return new Date(localizedTime);
};

export const getLocalizedTime = (time, timezone) => {
  const d = new Date(time * 1000);
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const localizedTime = utc + 1000 * timezone;

  return new Date(localizedTime);
};

export const getPaddedClockText = text =>
  `${text}`.length > 1 ? text : `0${text}`;

export const getHHMM = date =>
  date
    ? `${getPaddedClockText(date.getHours())}:${getPaddedClockText(
        date.getMinutes()
      )}`
    : 'NA:NA';
