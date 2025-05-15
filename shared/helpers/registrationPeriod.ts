export const registrationPeriod = ((date: string) => {
  if (!date) return "0 дней";

  const startDate = new Date(date);
  const endDate = new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;

    const lastDayOfMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0
    ).getDate();
    days += lastDayOfMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${getRussianNoun(years, ["год", "года", "лет"])}`);
  if (months > 0) {
    parts.push(`${months} ${getRussianNoun(months, ["месяц", "месяца", "месяцев"])}`);
  }
  if (days > 0 || parts.length === 0) {
    parts.push(`${days} ${getRussianNoun(days, ["день", "дня", "дней"])}`);
  }

  return parts.join(", ");
});

function getRussianNoun(number: number, words: [string, string, string]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}