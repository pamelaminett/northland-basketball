import type {PageFacebookFeed} from "@/sanity/lib/types";

function isFacebookGroupUrl(pageUrl: string) {
  return /facebook\.com\/groups\//i.test(pageUrl);
}

function getFacebookEmbedUrl(pageUrl: string, width: number) {
  return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=${width}&height=720&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`;
}

function FeedCard({
  feed,
  embedWidth = 340,
  panelHeight = 560,
  embedTopOffset = 0
}: {
  feed: PageFacebookFeed;
  embedWidth?: number;
  panelHeight?: number;
  embedTopOffset?: number;
}) {
  if (isFacebookGroupUrl(feed.pageUrl)) {
    return (
      <article
        key={`${feed.title}-${feed.pageUrl}`}
        className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8"
      >
        <div className="border-b border-black/8 px-5 py-4">
          <h3 className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-northland-blue">
            {feed.title}
          </h3>
        </div>
        <div className="px-5 py-6">
          <p className="text-base leading-7 text-black/75">
            This Facebook group can&apos;t be embedded here, but you can open it directly on Facebook.
          </p>
          <a
            href={feed.pageUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 border-b border-northland-blue pb-0.5 text-sm font-semibold text-northland-blue transition hover:border-northland-tealDark hover:text-northland-tealDark"
          >
            Open Facebook Group
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    );
  }

  const embedUrl = getFacebookEmbedUrl(feed.pageUrl, embedWidth);

  return (
    <article
      key={`${feed.title}-${feed.pageUrl}`}
      className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8"
    >
      <div className="border-b border-black/8 px-5 py-4">
        <h3 className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-northland-blue">
          {feed.title}
        </h3>
      </div>
      <div className="relative overflow-hidden bg-white" style={{height: `${panelHeight}px`}}>
        <iframe
          title={`${feed.title} Facebook feed`}
          src={embedUrl}
          width={String(embedWidth)}
          height="720"
          className="absolute left-1/2 max-w-full -translate-x-1/2"
          style={{border: "none", overflow: "hidden", width: "100%", maxWidth: `${embedWidth}px`, top: `${embedTopOffset}px`}}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          loading="lazy"
        />
      </div>
      <div className="px-5 py-4">
        <a
          href={feed.pageUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border-b border-northland-blue pb-0.5 text-sm font-semibold text-northland-blue transition hover:border-northland-tealDark hover:text-northland-tealDark"
        >
          Open on Facebook
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export function PageFacebookFeeds({
  feeds,
  variant = "grid"
}: {
  feeds: PageFacebookFeed[];
  variant?: "grid" | "sidebar" | "inlineRight";
}) {
  if (!feeds.length) {
    return null;
  }

  if (variant === "sidebar") {
    const feed = feeds[0];

    return (
      <aside>
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">Facebook</h2>
          <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
        </div>
        <FeedCard feed={feed} embedWidth={340} panelHeight={560} />
      </aside>
    );
  }

  if (variant === "inlineRight") {
    const feed = feeds[0];

    return (
      <section>
        <div className="w-full min-[900px]:max-w-[21.25rem]">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">Facebook</h2>
            <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
          </div>
          <FeedCard feed={feed} embedWidth={340} panelHeight={560} />
        </div>
      </section>
    );
  }

  const columnClass = feeds.length >= 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section className="mt-12">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">Facebook</h2>
        <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
      </div>
      <div className={`grid gap-6 ${columnClass}`}>
        {feeds.map((feed) => <FeedCard key={`${feed.title}-${feed.pageUrl}`} feed={feed} embedWidth={340} />)}
      </div>
    </section>
  );
}
