export function formatList(items: Array<string>): string {
  return new Intl.ListFormat("en", {
    style: "narrow",
    type: "conjunction",
  }).format(items);
}
