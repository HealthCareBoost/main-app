export function removeWordsFromArray(text: string, words: string[]): string {
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
] as const;

// export const HTML_Tags = {
//   "<b>": "",
//   "</b>": "",
//   "</a>": "",
//   "<a href=": "",
//   ">": " ",
//   "<ol>": "",
//   "<li>": "",
//   "</li>": "\n",
//   "</ol>": "",
//   "<span>": "",
//   "</span>": " ",
// };
