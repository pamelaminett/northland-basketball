"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import type {HomePageRegion} from "@/sanity/lib/types";

export function RegionNavClient({regions}: {regions: HomePageRegion[]}) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium uppercase tracking-[0.18em] text-northland-blue sm:gap-x-10">
      {regions.map((region) => {
        const isCurrent = Boolean(region.href && pathname === region.href);

        return (
          <li key={region.label}>
            {region.href ? (
              <Link
                href={region.href}
                className={`transition ${isCurrent ? "border-b-2 border-northland-blue pb-1 text-northland-blue" : "hover:text-northland-tealDark"}`}
                aria-current={isCurrent ? "page" : undefined}
              >
                {region.label}
              </Link>
            ) : (
              <span>{region.label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
