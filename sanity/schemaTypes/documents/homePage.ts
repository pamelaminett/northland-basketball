import {defineArrayMember, defineField, defineType} from "sanity";
import {PremLeagueTeamSelect} from "@/sanity/components/PremLeagueTeamSelect";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", initialValue: "Homepage", validation: (rule) => rule.required()}),
    defineField({name: "heroHeading", title: "Hero heading", type: "string", initialValue: "WE ARE THE NORTH"}),
    defineField({name: "regions", title: "Regions", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "label", title: "Label", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string"})]})]}),
    defineField({
      name: "heroImages",
      title: "Hero image library",
      description: "Upload a pool of hero images. The site will randomly choose 6 unique images on each page load.",
      type: "array",
      of: [defineArrayMember({type: "image", options: {hotspot: true}, fields: [defineField({name: "alt", title: "Alt text", type: "string"})]})],
      validation: (rule) => rule.max(24)
    }),
    defineField({
      name: "premLeague",
      title: "Prem League section",
      type: "object",
      fields: [
        defineField({name: "title", title: "Section title", type: "string", initialValue: "Northland Prem League"}),
        defineField({name: "fixtureRound", title: "Fixture round", type: "string"}),
        defineField({name: "resultsRound", title: "Results round", type: "string"}),
        defineField({name: "date", title: "Schedule date", type: "date"}),
        defineField({name: "resultsDate", title: "Results date", type: "date"}),
        defineField({name: "fixtureLabel", title: "Fixture tab label", type: "string", initialValue: "Fixture"}),
        defineField({name: "resultsLabel", title: "Results tab label", type: "string", initialValue: "Results"}),
        defineField({
          name: "fixtures",
          title: "Fixtures",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "homeTeam",
                  title: "Home team",
                  type: "string",
                  components: {input: PremLeagueTeamSelect},
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "awayTeam",
                  title: "Away team",
                  type: "string",
                  components: {input: PremLeagueTeamSelect},
                  validation: (rule) => rule.required()
                }),
                defineField({name: "date", title: "Game date", type: "date"}),
                defineField({name: "time", title: "Time", type: "string"}),
                defineField({name: "venue", title: "Venue", type: "string"})
              ],
              preview: {select: {title: "homeTeam", subtitle: "awayTeam"}}
            })
          ]
        }),
        defineField({
          name: "results",
          title: "Results",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "homeTeam",
                  title: "Home team",
                  type: "string",
                  components: {input: PremLeagueTeamSelect},
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "awayTeam",
                  title: "Away team",
                  type: "string",
                  components: {input: PremLeagueTeamSelect},
                  validation: (rule) => rule.required()
                }),
                defineField({name: "date", title: "Game date", type: "date"}),
                defineField({name: "homeScore", title: "Home score", type: "string"}),
                defineField({name: "awayScore", title: "Away score", type: "string"}),
                defineField({name: "venue", title: "Venue", type: "string"})
              ],
              preview: {
                select: {homeTeam: "homeTeam", awayTeam: "awayTeam", homeScore: "homeScore", awayScore: "awayScore"},
                prepare({homeTeam, awayTeam, homeScore, awayScore}) {
                  const scoreline =
                    homeScore || awayScore ? `${homeScore || "-"} - ${awayScore || "-"}` : "Score pending";

                  return {
                    title: `${homeTeam || "Home"} vs ${awayTeam || "Away"}`,
                    subtitle: scoreline
                  };
                }
              }
            })
          ]
        })
      ]
    }),
    defineField({name: "programmesHeading", title: "Programmes heading", type: "string", initialValue: "PLAY BASKETBALL AT EVERY LEVEL"}),
    defineField({name: "programmesBody", title: "Programmes body", type: "array", of: [defineArrayMember({type: "block"})]}),
    defineField({name: "programmeCards", title: "Programme cards", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string"}), defineField({name: "featured", title: "Featured", type: "boolean", initialValue: false})]})]}),
    defineField({name: "statement", title: "Statement", type: "string", initialValue: "AS THE GAME RISES, SO DO WE"}),
    defineField({name: "latestHeading", title: "Latest heading", type: "string", initialValue: "The Latest"})
  ],
  preview: {prepare: () => ({title: "Homepage"})}
});
