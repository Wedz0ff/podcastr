export function convertTitleToId(title: string) {
  const result = title.replace(/[^\w]/g, '').toLowerCase();

  return result;
}
