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
