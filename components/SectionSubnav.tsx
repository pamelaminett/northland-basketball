import Link from "next/link";
import type {NavLink} from "@/sanity/lib/types";

export function SectionSubnav({title, items, currentPath}: {title: string; items: NavLink[]; currentPath: string}) {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="space-y-5">
      <div className="hidden min-[1340px]:block">
        <div className="mb-5 flex items-center gap-4">
          <h2 className="text-xl font-medium tracking-[0.06em] text-[#202020]">{title}</h2>
          <div className="h-px flex-1 bg-black/35" aria-hidden="true" />
        </div>
        <nav aria-label={`${title} section`}>
          <ul className="space-y-2">
            {items.map((item) => {
              const isCurrent = item.href === currentPath;

              return (
                <li key={`${title}-${item.label}-desktop`}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block rounded px-3 py-2 text-[0.98rem] leading-6 transition ${isCurrent ? "bg-northland-blue text-white" : "text-northland-blue hover:bg-[#eef2ff]"}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="block rounded px-3 py-2 text-[0.98rem] leading-6 text-northland-blue/70">{item.label}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
