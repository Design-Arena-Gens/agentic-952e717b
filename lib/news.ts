import Parser from 'rss-parser';

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  publishedAt: Date | null;
  description: string;
};

const RSS_SOURCES: Array<{ name: string; url: string }> = [
  { name: 'Indian Express (Mumbai)', url: 'https://indianexpress.com/section/cities/mumbai/feed/' },
  { name: 'Hindustan Times (Mumbai)', url: 'https://www.hindustantimes.com/rss/cities/mumbai/rssfeed.xml' },
  { name: 'Mid-Day (Mumbai News)', url: 'https://www.mid-day.com/mumbai/mumbai-news/rss' }
];

const parser = new Parser({ timeout: 10000 });

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function fetchLatestMumbaiNews(): Promise<NewsItem[]> {
  const feeds = await Promise.allSettled(
    RSS_SOURCES.map(async (src) => {
      const feed = await parser.parseURL(src.url);
      return feed.items.map((it) => {
        const title = (it.title || '').trim();
        const link = (it.link || '').trim();
        const description = stripHtml((it.contentSnippet || it.content || it['content:encoded'] || it.summary || '').toString());
        const publishedAt = it.isoDate ? new Date(it.isoDate) : (it.pubDate ? new Date(it.pubDate) : null);
        return { title, link, description, publishedAt, source: src.name } as NewsItem;
      });
    })
  );

  const items: NewsItem[] = [];
  for (const res of feeds) {
    if (res.status === 'fulfilled') {
      items.push(...res.value);
    }
  }

  const now = new Date();
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

  const filtered = items
    .filter((n) => n.title.toLowerCase().includes('mumbai') || n.description.toLowerCase().includes('mumbai'))
    .filter((n) => {
      if (!n.publishedAt) return true;
      return now.getTime() - n.publishedAt.getTime() < oneWeekMs;
    })
    .sort((a, b) => {
      const at = a.publishedAt ? a.publishedAt.getTime() : 0;
      const bt = b.publishedAt ? b.publishedAt.getTime() : 0;
      return bt - at;
    });

  return filtered;
}
