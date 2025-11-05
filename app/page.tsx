import { fetchLatestMumbaiNews } from '@/lib/news';
import { summarizeUnder80Words } from '@/lib/summarize';
import { InstagramPost } from '@/components/InstagramPost';

export const revalidate = 0; // always fresh

export default async function Page() {
  const items = await fetchLatestMumbaiNews();
  const top = items[0];

  const fallback = {
    title: 'Mumbai City Updates',
    description:
      'Stay informed with the latest civic, traffic, events, weather, real estate, and crime updates from Mumbai. Live coverage and verified sources summarized for quick reading.',
    source: '?',
    link: '#',
    publishedAt: new Date(),
  } as const;

  const title = top?.title ?? fallback.title;
  const summary = summarizeUnder80Words(title, top?.description ?? fallback.description);
  const date = top?.publishedAt ?? fallback.publishedAt;
  const location = 'Mumbai';
  const source = top?.source ?? fallback.source;
  const link = top?.link ?? fallback.link;

  return (
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-[1080px]">
        <InstagramPost title={title} summary={summary} date={date} location={location} source={source} link={link} />
      </div>
    </main>
  );
}
