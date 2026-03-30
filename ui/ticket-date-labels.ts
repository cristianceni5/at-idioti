const weekdayFormatter = new Intl.DateTimeFormat("it-IT", { weekday: "long" });
const monthFormatter = new Intl.DateTimeFormat("it-IT", { month: "long" });
function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function capitalize(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatDateTime(value: Date) {
  const day = pad2(value.getDate());
  const month = pad2(value.getMonth() + 1);
  const year = value.getFullYear();
  const time = formatTime12(value);
  return `${day}/${month}/${year} alle ${time}`;
}

function formatTime12(value: Date) {
  const hour24 = value.getHours();
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${pad2(value.getMinutes())}`;
}

export function getTicketDateLabels(
  now: Date,
  activationStartedAt?: number | null,
  totalValiditySeconds = 5400
) {
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const activationValidationDate = activationStartedAt
    ? new Date(activationStartedAt - 5 * 60 * 1000)
    : fiveMinutesAgo;
  const validationDate =
    activationValidationDate < startOfToday ? startOfToday : activationValidationDate;
  const expiryDate = new Date(validationDate.getTime() + totalValiditySeconds * 1000);
  const dayName = capitalize(weekdayFormatter.format(now));
  const monthName = monthFormatter.format(now);

  return {
    lastUpdateLabel: formatTime12(now),
    activationDateLabel: formatDateTime(validationDate),
    expiryDateLabel: formatDateTime(expiryDate),
    historyDayLabel: `Oggi - ${dayName} ${now.getDate()} ${monthName}`,
    historyTimeLabel: formatTime12(validationDate),
  };
}
