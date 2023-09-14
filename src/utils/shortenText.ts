export function shortenText(text: string, num = 5): string {
  const sentencePattern = /([.!?])\s+/;
  const sentences = text.split(sentencePattern);
  const shortenedText = sentences.slice(0, num * 2).join("");
  return shortenedText;
}
