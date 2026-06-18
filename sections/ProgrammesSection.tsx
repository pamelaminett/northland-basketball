import {ProgrammeGrid} from "@/components/ProgrammeGrid";
import type {HomePageDocument} from "@/sanity/lib/types";

export function ProgrammesSection({homePage}: {homePage?: HomePageDocument | null}) {
  return (
    <section aria-labelledby="programmes-heading" className="px-4 pb-6 pt-2 sm:px-6 md:pb-8 md:pt-4 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex items-center gap-4">
          <h2 id="programmes-heading" className="text-2xl font-medium tracking-[0.06em] text-[#202020]">
            Play Basketball
          </h2>
          <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
        </div>
        <ProgrammeGrid programmes={homePage?.programmeCards} />
      </div>
    </section>
  );
}
