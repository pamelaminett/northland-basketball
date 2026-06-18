"use client";

import {useMemo} from "react";
import type {StringInputProps} from "sanity";
import {useFormValue} from "sanity";
import {premLeagueTeams} from "@/sanity/lib/premLeagueTeams";

type TeamRow = {
  _key?: string;
  homeTeam?: string;
  awayTeam?: string;
};

function getArrayFieldFromPath(path: StringInputProps["path"]) {
  const field = path.find((segment): segment is string => segment === "fixtures" || segment === "results");
  return field || "fixtures";
}

function getRowKeyFromPath(path: StringInputProps["path"]) {
  const keyedSegment = path.find(
    (segment): segment is {_key: string} => typeof segment === "object" && segment !== null && "_key" in segment
  );

  return keyedSegment?._key;
}

export function PremLeagueTeamSelect(props: StringInputProps) {
  const arrayField = getArrayFieldFromPath(props.path);
  const rows = (useFormValue(["premLeague", arrayField]) as TeamRow[] | undefined) || [];
  const rowKey = getRowKeyFromPath(props.path);
  const currentFieldName = typeof props.path[props.path.length - 1] === "string" ? String(props.path[props.path.length - 1]) : "homeTeam";

  const availableTeams = useMemo(() => {
    const currentRowIndex = rows.findIndex((row) => row._key === rowKey);
    const currentRow = currentRowIndex >= 0 ? rows[currentRowIndex] : undefined;
    const previousRows = currentRowIndex >= 0 ? rows.slice(0, currentRowIndex) : rows;
    const usedTeams = new Set<string>();

    previousRows.forEach((row) => {
      if (row.homeTeam) usedTeams.add(row.homeTeam);
      if (row.awayTeam) usedTeams.add(row.awayTeam);
    });

    const siblingFieldName = currentFieldName === "homeTeam" ? "awayTeam" : "homeTeam";
    const siblingValue = currentRow?.[siblingFieldName as "homeTeam" | "awayTeam"];
    const currentValue = props.value;

    return premLeagueTeams.filter((team) => {
      if (team === currentValue) {
        return true;
      }

      if (siblingValue && team === siblingValue) {
        return false;
      }

      return !usedTeams.has(team);
    });
  }, [currentFieldName, props.value, rowKey, rows]);

  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        ...(props.schemaType.options || {}),
        list: availableTeams.map((team) => ({title: team, value: team}))
      }
    }
  });
}
