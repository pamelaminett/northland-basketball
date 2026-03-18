import { NewsCard } from "@/components/NewsCard";

const newsItems = [
  {
    title: "U18 Girls Northland Trials",
    category: "Trials",
    image: "/placeholders/news-1.svg"
  },
  {
    title: "U20 Mens Northland Trials",
    category: "Trials",
    image: "/placeholders/news-2.svg"
  },
  {
    title: "Anahera Worsfold Committed",
    category: "Player News",
    image: "/placeholders/news-3.svg"
  }
];

export function NewsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
      {newsItems.map((item) => (
        <NewsCard key={item.title} title={item.title} category={item.category} image={item.image} />
      ))}
    </div>
  );
}
