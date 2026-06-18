import {ProgrammeCard} from "@/components/ProgrammeCard";
import type {ProgrammeCardItem} from "@/sanity/lib/types";

const fallbackProgrammes: ProgrammeCardItem[] = [
  {title: "KiwiHoops (Youth)", href: "/programmes/kiwi-hoops"},
  {title: "School Programmes and Competitions", href: "/competitions/secondary-school-competition"},
  {title: "Adult Basketball", href: "/programmes/adult-basketball"},
  {title: "Girls and Women", href: "/programmes/girls-and-women"},
  {title: "3x3", href: "/programmes/3x3"},
  {title: "Representative Pathways", href: "/reps/pathways"}
];

const programmeDescriptions: Record<string, string> = {
  "KiwiHoops (Youth)": "Fun, age-appropriate basketball sessions that help tamariki build confidence, movement skills and love for the game.",
  "School Programmes and Competitions": "Local school competitions, in-school delivery and pathways that connect young players with regular games.",
  "Adult Basketball": "Social and competitive playing opportunities for adults across the region, from weekly leagues to community events.",
  "Girls and Women": "Dedicated programmes and competitions that support girls and women to play, coach, officiate and lead.",
  "3x3": "Fast, accessible basketball with smaller teams, quick games and plenty of touches for every player.",
  "Representative Pathways": "Trial, training and tournament opportunities for players ready to represent Northland at the next level."
};

export function ProgrammeGrid({programmes}: {programmes?: ProgrammeCardItem[]}) {
  const items = programmes?.length ? programmes : fallbackProgrammes;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((programme) => (
        <ProgrammeCard
          key={programme.title}
          title={programme.title}
          href={programme.href}
          featured={programme.featured}
          description={programmeDescriptions[programme.title]}
        />
      ))}
    </div>
  );
}
