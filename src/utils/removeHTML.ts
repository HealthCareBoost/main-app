export function removeWordsFromArray(
  text: string,
  words: string[] = HTML_Tags
): string {
  const pattern = new RegExp(words.join("|"), "gi");
  const updatedText = text.replace(pattern, "");
  return updatedText;
}

export const HTML_Tags = [
  "<b>",
  "</b>",
  "</a>",
  "<a href=",
  ">",
  "<ol>",
  "<li>",
  "</li>",
  "</ol>",
  "<span>",
  "</span>",
];
