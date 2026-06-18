import {PortableText} from "@portabletext/react";
import {portableTextComponents} from "@/components/PortableTextComponents";
import type {PageAccordionSection, PageAccordionYearGroup} from "@/sanity/lib/types";

function AccordionList({sections}: {sections: PageAccordionSection[]}) {
  if (!sections.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <details
          key={section.title}
          className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8"
        >
          <summary className="cursor-pointer list-none px-5 py-4 text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-northland-blue">
            <span className="flex items-center justify-between gap-4">
              <span>{section.title}</span>
              <span className="text-base leading-none text-northland-blue/60">+</span>
            </span>
          </summary>
          <div className="border-t border-black/8 px-5 py-5">
            <div className="cms-content">
              <PortableText value={section.body || []} components={portableTextComponents} />
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export function PageAccordionSections({
  sections,
  yearGroups = []
}: {
  sections: PageAccordionSection[];
  yearGroups?: PageAccordionYearGroup[];
}) {
  const groupsWithContent = yearGroups.filter((group) => group.sections?.length);

  if (!groupsWithContent.length && !sections.length) {
    return null;
  }

  return (
    <section className="mt-10 space-y-10">
      {groupsWithContent.map((group) => (
        <div key={group.title}>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-2xl font-medium tracking-[0.06em] text-[#202020]">{group.title}</h2>
            <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
          </div>
          <AccordionList sections={group.sections || []} />
        </div>
      ))}
      {!groupsWithContent.length ? <AccordionList sections={sections} /> : null}
    </section>
  );
}
