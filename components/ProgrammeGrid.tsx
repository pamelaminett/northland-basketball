import {ProgrammeCard} from "@/components/ProgrammeCard";
import type {ProgrammeCardItem} from "@/sanity/lib/types";

const fallbackProgrammes: ProgrammeCardItem[] = [
  {title: "KiwiHoops (Youth)", href: "/programmes/kiwi-hoops", featured: true},
  {title: "School Programmes and Competitions", href: "/competitions/secondary-school-competition"},
  {title: "Adult Basketball", href: "/programmes/adult-basketball"},
  {title: "Girls and Women", href: "/programmes/girls-and-women"},
  {title: "3x3", href: "/programmes/3x3"},
  {title: "Representative Pathways", href: "/reps/pathways"}
];

export function ProgrammeGrid({programmes}: {programmes?: ProgrammeCardItem[]}) {
  const items = programmes?.length ? programmes : fallbackProgrammes;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((programme) => (
        <ProgrammeCard key={programme.title} title={programme.title} href={programme.href} featured={programme.featured} />
      ))}
    </div>
  );
}
