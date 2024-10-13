export const getUniques = (array: any, key: string) => {
  const seen = new Set();
  const uniques: any = [];

  array.forEach((item: any) => {
    if (!seen.has(item[key])) {
      seen.add(item[key]);
      uniques.push(item);
    }
  });

  return uniques;
};

export const isWithinPreviousTwoDays = (date: any) => {
  if (!date) return false;

  const givenDate = new Date(date);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  const dayBeforeYesterday = new Date(givenDate);
  dayBeforeYesterday.setDate(givenDate.getDate() - 2);

  const yesterday = new Date(givenDate);
  yesterday.setDate(givenDate.getDate() - 1);

  return (
    currentDate.getTime() === dayBeforeYesterday.getTime() ||
    currentDate.getTime() === yesterday.getTime()
  );
};
