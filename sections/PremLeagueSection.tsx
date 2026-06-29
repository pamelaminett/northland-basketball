"use client";

import {useMemo, useState} from "react";
import {FacebookFeedPanel} from "@/components/FacebookFeedPanel";
import type {HomePageDocument, PremLeagueFixture, PremLeagueResult} from "@/sanity/lib/types";

const fallbackFixtures: PremLeagueFixture[] = [
  {homeTeam: "Dargaville High School", awayTeam: "Rodney College", date: "2026-06-12", time: "6pm", venue: "Dargaville High School"},
  {homeTeam: "Kaitaia College", awayTeam: "Te Kamo High School", date: "2026-06-12", time: "6pm", venue: "Kaitaia College"},
  {homeTeam: "Northland College", awayTeam: "Otamatea", date: "2026-06-13", time: "6pm", venue: "Northland College"},
  {homeTeam: "Pompallier Catholic College", awayTeam: "Taipa Area School", date: "2026-06-12", time: "6pm", venue: "Pompallier Catholic College"},
  {homeTeam: "Ruawai College", awayTeam: "TAS Senior Boys", date: "2026-06-14", time: "6pm", venue: "Ruawai College"}
];

const fallbackResults: PremLeagueResult[] = [
  {homeTeam: "Dargaville High School", awayTeam: "Rodney College", date: "2026-06-05", homeScore: "68", awayScore: "61", venue: "Dargaville High School"},
  {homeTeam: "Kaitaia College", awayTeam: "Te Kamo High School", date: "2026-06-05", homeScore: "57", awayScore: "63", venue: "Kaitaia College"},
  {homeTeam: "Northland College", awayTeam: "Otamatea", date: "2026-06-06", homeScore: "74", awayScore: "55", venue: "Northland College"}
];

function formatTabDate(value?: string, daysOffset = 0) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setDate(date.getDate() + daysOffset);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

function formatGameDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(date);
}

function getResultScores(result: PremLeagueResult) {
  if (result.homeScore || result.awayScore) {
    return {
      homeScore: result.homeScore || "-",
      awayScore: result.awayScore || "-"
    };
  }

  if (!result.result?.includes("-")) {
    return {homeScore: "-", awayScore: "-"};
  }

  const [homeScore, awayScore] = result.result.split("-").map((value) => value.trim());
  return {
    homeScore: homeScore || "-",
    awayScore: awayScore || "-"
  };
}

export function PremLeagueSection({homePage, showSidebar = true, compactTop = false}: {homePage?: HomePageDocument | null; showSidebar?: boolean; compactTop?: boolean}) {
  const premLeague = homePage?.premLeague;
  const fixtureLabel = premLeague?.fixtureLabel || "Fixture";
  const resultsLabel = premLeague?.resultsLabel || "Results";
  const fixtureRound = premLeague?.fixtureRound || "Round 5";
  const resultsRound = premLeague?.resultsRound || "Round 4";
  const [view, setView] = useState<"fixtures" | "results">("fixtures");

  const fixtures = useMemo(
    () => (premLeague?.fixtures?.length ? premLeague.fixtures : fallbackFixtures),
    [premLeague?.fixtures]
  );
  const results = useMemo(
    () => (premLeague?.results?.length ? premLeague.results : fallbackResults),
    [premLeague?.results]
  );
  const tabs = (
    <div className="flex items-end gap-0">
      <button
        type="button"
        onClick={() => setView("fixtures")}
        className={`border border-black/8 border-b-0 px-4 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition ${
          view === "fixtures"
            ? "bg-white text-northland-blue"
            : "bg-[#f3f3f7] text-northland-blue/75 hover:bg-[#ececf3]"
        }`}
      >
        {fixtureLabel} {fixtureRound}
      </button>
      <button
        type="button"
        onClick={() => setView("results")}
        className={`-ml-px border border-black/8 border-b-0 px-4 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition ${
          view === "results"
            ? "bg-white text-northland-blue"
            : "bg-[#f3f3f7] text-northland-blue/75 hover:bg-[#ececf3]"
        }`}
      >
        {resultsLabel} {resultsRound}
      </button>
    </div>
  );

  return (
    <section aria-labelledby="prem-league-heading" className={`px-4 sm:px-6 lg:px-8 ${compactTop ? "pb-8 pt-0 md:pb-10" : "py-8 md:py-10"}`}>
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-10 xl:items-start ${showSidebar ? "xl:grid-cols-[minmax(0,1.7fr)_minmax(19rem,0.88fr)]" : ""}`}>
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <h2 id="prem-league-heading" className="text-2xl font-medium tracking-[0.06em] text-[#202020]">
                  {premLeague?.title || "Northland Prem League"}
                </h2>
                <div className="h-px flex-1 bg-black/45" aria-hidden="true" />
              </div>
            </div>

            {view === "fixtures" ? (
              <div>
                {tabs}
                <div className="-mt-px overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
                  <div className="hidden grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.1fr)_3rem_minmax(0,1.1fr)_4.5rem_minmax(0,1.15fr)] gap-x-3 px-5 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-northland-blue/55 md:grid">
                    <span>Date</span>
                    <span>Home</span>
                    <span className="text-center">vs.</span>
                    <span>Away</span>
                    <span>Time</span>
                    <span>Venue</span>
                  </div>
                  <div className="hidden md:block">
                    {fixtures.map((fixture, index) => (
                      <div
                        key={`${fixture.homeTeam}-${fixture.awayTeam}-${fixture.date || fixture.time || ""}`}
                        className={`grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.1fr)_3rem_minmax(0,1.1fr)_4.5rem_minmax(0,1.15fr)] gap-x-3 px-5 py-3 text-[0.9rem] leading-6 text-northland-blue ${index % 2 === 0 ? "bg-white" : "bg-[#fbfbfe]"} ${index === fixtures.length - 1 ? "" : "border-b border-black/6"}`}
                      >
                        <span className="font-semibold text-black/72">{formatGameDate(fixture.date) || "-"}</span>
                        <span className="font-medium">{fixture.homeTeam}</span>
                        <span className="text-center lowercase text-black/45">vs.</span>
                        <span className="font-medium">{fixture.awayTeam}</span>
                        <span className="font-semibold text-black/72">{fixture.time || "-"}</span>
                        <span className="text-black/72">@ {fixture.venue || "-"}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 p-4 md:hidden">
                    {fixtures.map((fixture) => (
                      <article
                        key={`${fixture.homeTeam}-${fixture.awayTeam}-${fixture.date || fixture.time || ""}-mobile`}
                        className="rounded-[4px] border border-black/8 bg-[#fbfbfe] p-4 text-northland-blue"
                      >
                        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-northland-blue/70">
                          <span>{formatGameDate(fixture.date) || "Date TBC"}</span>
                          <span>{fixture.time || "Time TBC"}</span>
                        </div>
                        <div className="grid gap-2 text-base leading-6">
                          <div className="font-medium">{fixture.homeTeam}</div>
                          <div className="text-sm uppercase tracking-[0.16em] text-black/45">vs</div>
                          <div className="font-medium">{fixture.awayTeam}</div>
                        </div>
                        <div className="mt-4 text-sm font-medium text-black/72">
                          {fixture.venue ? `@ ${fixture.venue}` : "Venue TBC"}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {tabs}
                <div className="-mt-px overflow-hidden bg-white shadow-[0_18px_40px_rgba(12,18,58,0.08)] ring-1 ring-black/8">
                  <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(5.5rem,0.7fr)_4.5rem_minmax(0,1.1fr)_4.5rem] gap-x-3 px-5 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-northland-blue/55 md:grid">
                    <span>Home</span>
                    <span>Date</span>
                    <span className="text-center">Score</span>
                    <span>Away</span>
                    <span className="text-center">Score</span>
                  </div>
                  <div className="hidden md:block">
                    {results.map((result, index) => {
                      const {homeScore, awayScore} = getResultScores(result);

                      return (
                        <div
                          key={`${result.homeTeam}-${result.awayTeam}-${homeScore}-${awayScore}`}
                          className={`grid grid-cols-[minmax(0,1.1fr)_minmax(5.5rem,0.7fr)_4.5rem_minmax(0,1.1fr)_4.5rem] gap-x-3 px-5 py-3 text-[0.9rem] leading-6 text-northland-blue ${index % 2 === 0 ? "bg-white" : "bg-[#fbfbfe]"} ${index === results.length - 1 ? "" : "border-b border-black/6"}`}
                        >
                          <span className="font-medium">{result.homeTeam}</span>
                          <span className="font-semibold text-black/72">{formatGameDate(result.date) || "-"}</span>
                          <span className="text-center font-semibold text-black/72">{homeScore}</span>
                          <span className="font-medium">{result.awayTeam}</span>
                          <span className="text-center font-semibold text-black/72">{awayScore}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid gap-3 p-4 md:hidden">
                    {results.map((result) => {
                      const {homeScore, awayScore} = getResultScores(result);

                      return (
                        <article
                          key={`${result.homeTeam}-${result.awayTeam}-${homeScore}-${awayScore}-mobile`}
                          className="rounded-[4px] border border-black/8 bg-[#fbfbfe] p-4 text-northland-blue"
                        >
                          <div className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-northland-blue/70">
                            {formatGameDate(result.date) || "Date TBC"}
                          </div>
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-medium">{result.homeTeam}</span>
                              <span className="text-lg font-semibold text-black/78">{homeScore}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-medium">{result.awayTeam}</span>
                              <span className="text-lg font-semibold text-black/78">{awayScore}</span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {showSidebar ? <FacebookFeedPanel /> : null}
        </div>
      </div>
    </section>
  );
}
