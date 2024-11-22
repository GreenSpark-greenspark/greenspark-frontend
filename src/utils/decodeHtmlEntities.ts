import { decode } from "html-entities";

export function decodeHtmlEntities(data: any) {
  if (typeof data === "string") {
    return decode(data);
  }

  // data가 string이 아닐 경우
    if (typeof data === "object" && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = decodeHtmlEntities(data[key]);
        return acc;
      }, {} as any);
    }

  return data;
}
