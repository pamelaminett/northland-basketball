import Image from "next/image";
import type {PortableTextComponents} from "@portabletext/react";
import {urlFor} from "@/sanity/lib/image";

type PortableImageValue = {
  alt?: string;
  asset?: unknown;
};

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
    }
  }
};
