export function summarizeUnder80Words(title: string, text: string): string {
  const maxWords = 80;
  const clean = text
    .replace(/\s+/g, ' ')
    .replace(/\[[^\]]*\]/g, '')
    .trim();

  // Prefer first 2-3 sentences for a crisp, factual tone
  const sentences = clean.split(/(?<=[.!?])\s+/).slice(0, 3);
  let draft = sentences.join(' ');

  // Fallback if description missing: use title
  if (!draft || draft.length < 40) {
    draft = `${title}.`;
  }

  const words = draft.split(/\s+/);
  if (words.length <= maxWords) return draft.trim();
  return words.slice(0, maxWords).join(' ').replace(/[.,;:!?]$/, '').trim() + '?';
}
