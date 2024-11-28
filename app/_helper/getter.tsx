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

export const isBetweenSpotRange = (spotRangeArr: Date[]) => {
  if (!spotRangeArr || spotRangeArr.length < 2) return false;
  const start = new Date(spotRangeArr[0]).getTime();
  const end = new Date(spotRangeArr[1]).getTime();
  const now = new Date().getTime();
  return now > start && now < end;
};

export const isWithinPreviousTwoDays = (givenDate: string) => {
  if (!givenDate) return false;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const endDate = new Date(givenDate);
  endDate.setDate(endDate.getDate() - 1);

  const startDate = new Date(givenDate);

  let spotCount = 0;

  while (spotCount < 2) {
    startDate.setDate(startDate.getDate() - 1);

    if (!(startDate.getDay() === 5 || startDate.getDay() === 6)) {
      spotCount++;
    }
  }
  return currentDate >= startDate && currentDate <= endDate;
};
