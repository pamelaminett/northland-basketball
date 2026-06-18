"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import type {SanityImage} from "@/sanity/lib/types";
import {urlFor} from "@/sanity/lib/image";

const rotatingHeroImageCount = 4;

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
  },
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

function shuffleUniqueImages<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function HeroImages({heading = "We The North", images}: {heading?: string; images?: SanityImage[] | null}) {
  const resolvedImages = (images || [])
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
  const initialDisplayImages = resolvedImages.length ? resolvedImages.slice(0, rotatingHeroImageCount) : fallbackImages.slice(0, rotatingHeroImageCount);
  const [displayImages, setDisplayImages] = useState(initialDisplayImages);

  useEffect(() => {
    if (!resolvedImages.length) {
      setDisplayImages(fallbackImages);
      return;
    }

    const randomizedImages = shuffleUniqueImages(resolvedImages).slice(0, rotatingHeroImageCount);
    const imagesWithFallbacks = randomizedImages.length < rotatingHeroImageCount
      ? [...randomizedImages, ...fallbackImages.slice(0, rotatingHeroImageCount - randomizedImages.length)]
      : randomizedImages;

    setDisplayImages(imagesWithFallbacks);
  }, [images]);

  return (
    <div>
      <div className="grid grid-cols-6 gap-2 md:gap-2.5 xl:gap-3 max-[600px]:grid-cols-1">
        <article className="col-span-2 flex min-h-[8.75rem] items-center overflow-hidden bg-[#13137d] px-3 py-3 shadow-card sm:min-h-[9.5rem] sm:px-3.5 sm:py-3.5 md:min-h-[12rem] md:px-4 md:py-4 lg:min-h-[15rem] lg:px-5 lg:py-5 xl:min-h-[22rem] xl:px-6 xl:py-6 max-[600px]:col-span-1">
          <h1 className="mx-auto w-fit font-display text-[2.45rem] font-bold uppercase leading-[0.84] tracking-[0.02em] text-white sm:text-[2.75rem] md:text-[3.35rem] lg:text-[4.35rem] xl:text-[6.45rem]">
            {heading.split(/\s+/).map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h1>
        </article>
        {displayImages.map((image) => (
          <article key={`${image.src}-${image.alt}`} className="relative min-h-[8.75rem] overflow-hidden bg-white shadow-card sm:min-h-[9.5rem] md:min-h-[12rem] lg:min-h-[15rem] xl:min-h-[22rem] max-[600px]:hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 16vw"
              className="object-cover"
              priority
              unoptimized={image.src.startsWith("http")}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${image.accent} via-transparent`} />
          </article>
        ))}
      </div>
    </div>
  );
}
