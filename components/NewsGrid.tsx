import {NewsCard} from "@/components/NewsCard";
import {urlFor} from "@/sanity/lib/image";
import {getPosts} from "@/sanity/lib/queries";

const fallbackNewsItems = [
  {
    title: "U18 Girls Northland Trials",
    category: "Trials",
    image: "/placeholders/news-1.svg",
    href: "/news"
  },
  {
    title: "U20 Mens Northland Trials",
    category: "Trials",
    image: "/placeholders/news-2.svg",
    href: "/news"
  },
  {
    title: "Anahera Worsfold Committed",
    category: "Player News",
    image: "/placeholders/news-3.svg",
    href: "/news"
  }
];

export async function NewsGrid() {
  const posts = await getPosts();
  const items = posts.length
    ? posts.slice(0, 3).map((post, index) => ({
        title: post.title,
        category: post.category || "News",
        image: post.mainImage?.asset ? urlFor(post.mainImage).width(960).height(640).fit("crop").url() : fallbackNewsItems[index]?.image,
        href: `/news/${post.slug}`
      }))
    : fallbackNewsItems;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
      {items.map((item) => (
        <NewsCard key={item.title} title={item.title} category={item.category} image={item.image} href={item.href} />
      ))}
    </div>
  );
}
