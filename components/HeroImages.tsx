import Image from "next/image";
import type {SanityImage} from "@/sanity/lib/types";
import {urlFor} from "@/sanity/lib/image";

const fallbackImages = [
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

function getImageUrl(image: SanityImage) {
  if (!image.asset) {
    return null;
  }

  return urlFor(image).width(1200).height(1600).fit("crop").url();
}

export function HeroImages({heading = "We Are The North", images = []}: {heading?: string; images?: SanityImage[]}) {
  const resolvedImages = images
    .map((image, index) => {
      const src = getImageUrl(image);

      if (!src) {
        return null;
      }

      return {
        src,
        alt: image.alt || `Northland Basketball hero image ${index + 1}`,
        accent: fallbackImages[index % fallbackImages.length]?.accent || "from-black/20 to-transparent"
      };
    })
    .filter((image): image is NonNullable<typeof image> => Boolean(image));
  const displayImages = resolvedImages.length ? resolvedImages : fallbackImages;
  const headingLines = heading.split(/\s+(?=North$)/i);

  return (
    <div className="relative">
      <div className="grid gap-3 md:grid-cols-3">
        {displayImages.map((image) => (
          <article key={image.src} className="relative min-h-[19rem] overflow-hidden bg-white shadow-card md:min-h-[34rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 33vw"
              className="object-cover"
              priority
              unoptimized={image.src.startsWith("http")}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${image.accent} via-transparent`} />
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <h1 className="hero-wordmark text-center font-display uppercase tracking-[0.02em] text-white/72">
          {headingLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h1>
      </div>
    </div>
  );
}
