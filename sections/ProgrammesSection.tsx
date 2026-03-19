import {PortableText} from "@portabletext/react";
import {ProgrammeGrid} from "@/components/ProgrammeGrid";
import type {HomePageDocument} from "@/sanity/lib/types";

const fallbackBody = [
  {
    _type: "block",
    _key: "programmes-body",
    children: [
      {
        _type: "span",
        _key: "programmes-body-span",
        text: "Northland Basketball is built by and for our people. Stretching from Te Hana in the South to Cape Reinga in the North, our clubs, programmes and competitions are powered by volunteers, whanau, coaches and players who care deeply about creating opportunities close to home."
      }
    ],
    markDefs: [],
    style: "normal"
  },
  {
    _type: "block",
    _key: "programmes-body-2",
    children: [
      {
        _type: "span",
        _key: "programmes-body-span-2",
        text: "We believe basketball should be accessible, welcoming and connected to the communities it represents."
      }
    ],
    markDefs: [],
    style: "normal"
  },
  {
    _type: "block",
    _key: "programmes-body-3",
    children: [
      {
        _type: "span",
        _key: "programmes-body-span-3",
        text: "We are dedicated to lifting every level of the sport across Northland, from first steps on the court to rep pathways and lifelong engagement."
      }
    ],
    markDefs: [],
    style: "normal"
  }
];

export function ProgrammesSection({homePage}: {homePage?: HomePageDocument | null}) {
  const heading = homePage?.programmesHeading || "Play Basketball at Every Level";
  const body = homePage?.programmesBody?.length ? homePage.programmesBody : fallbackBody;

  return (
    <section aria-labelledby="programmes-heading" className="px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="space-y-8">
          <h2
            id="programmes-heading"
            className="max-w-sm font-display text-6xl uppercase leading-[0.9] tracking-tight text-northland-teal sm:text-7xl"
          >
            {heading}
          </h2>
          <ProgrammeGrid programmes={homePage?.programmeCards} />
        </div>

        <div className="relative overflow-hidden pt-2">
          <div className="statement-mark absolute inset-0" aria-hidden="true" />
          <div className="cms-content relative max-w-xl text-lg leading-9 text-black/90">
            <PortableText value={body} />
          </div>
        </div>
      </div>
    </section>
  );
}
