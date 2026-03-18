import Image from "next/image";

const images = [
  {
    src: "/placeholders/hero-1.svg",
    alt: "Youth players competing in a basketball game",
    accent: "from-[#5d3318]/20 to-transparent"
  },
  {
    src: "/placeholders/hero-2.svg",
    alt: "Two youth players holding a basketball outdoors",
    accent: "from-[#1d6fb7]/15 to-transparent"
  },
  {
    src: "/placeholders/hero-3.svg",
    alt: "Indoor basketball action in black and white",
    accent: "from-black/25 to-transparent"
  }
];

export function HeroImages() {
  return (
    <div className="relative">
      <div className="grid gap-3 md:grid-cols-3">
        {images.map((image) => (
          <article key={image.src} className="relative min-h-[19rem] overflow-hidden bg-white shadow-card md:min-h-[34rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 33vw"
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${image.accent} via-transparent`} />
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <h1 className="hero-wordmark text-center font-display uppercase tracking-[0.02em] text-white/72">
          <span className="block">We Are The</span>
          <span className="block">North</span>
        </h1>
      </div>
    </div>
  );
}
