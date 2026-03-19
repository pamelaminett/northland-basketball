import {hasRequiredEnv} from "@/sanity/env";
import {StudioApp} from "./StudioApp";

export const metadata = {title: "Sanity Studio | Northland Basketball"};

export default async function StudioPage() {
  if (!hasRequiredEnv) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-northland-tealDark">Sanity Setup Required</p>
        <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight text-northland-blue sm:text-6xl">Add your Sanity environment variables</h1>
        <p className="mt-6 text-lg leading-8 text-black/75">Copy <code>.env.example</code> to <code>.env.local</code> and set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>. Once those are in place, this Studio route will boot inside the Next.js app.</p>
      </main>
    );
  }

  return <StudioApp />;
}
