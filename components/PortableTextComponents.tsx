import Image from "next/image";
import type {PortableTextComponents} from "@portabletext/react";
import {urlFor} from "@/sanity/lib/image";

type PortableImageValue = {
  alt?: string;
  asset?: unknown;
};

type YouTubeEmbedValue = {
  url?: string;
  caption?: string;
};

function getYouTubeEmbedUrl(url?: string) {
  if (!url) {
    return null;
  }

  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }

  return null;
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({value}: {value: PortableImageValue}) => {
      if (!value?.asset) {
        return null;
      }

      const imageUrl = urlFor(value as never).width(1600).fit("max").url();

      return (
        <figure className="my-8 overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={1600}
            height={1000}
            className="h-auto w-full"
            unoptimized
          />
        </figure>
      );
    },
    youtubeEmbed: ({value}: {value: YouTubeEmbedValue}) => {
      const embedUrl = getYouTubeEmbedUrl(value?.url);

      if (!embedUrl) {
        return null;
      }

      return (
        <figure className="my-8">
          <div className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
            <div className="relative aspect-video">
              <iframe
                src={embedUrl}
                title={value.caption || "YouTube video"}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          {value.caption ? <figcaption className="mt-3 text-sm leading-6 text-black/60">{value.caption}</figcaption> : null}
        </figure>
      );
    }
  }
};
