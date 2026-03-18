import { ProgrammeCard } from "@/components/ProgrammeCard";

const programmes = [
  { title: "KiwiHoops (Youth)", featured: true },
  { title: "School Programmes and Competitions" },
  { title: "Adult Basketball" },
  { title: "Girls and Women" },
  { title: "3x3" },
  { title: "Representative Pathways" }
];

export function ProgrammeGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {programmes.map((programme) => (
        <ProgrammeCard key={programme.title} title={programme.title} featured={programme.featured} />
      ))}
    </div>
  );
}
