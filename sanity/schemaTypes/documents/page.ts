import {defineArrayMember, defineField, defineType} from "sanity";

const sections = [
  {title: "About", value: "about"},
  {title: "Programmes", value: "programmes"},
  {title: "Competitions", value: "competitions"},
  {title: "Reps", value: "reps"},
  {title: "Coaches & Refs", value: "coaches-refs"},
  {title: "Resources", value: "resources"},
  {title: "Contact", value: "contact"}
];

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "section", title: "Section", type: "string", options: {list: sections}, validation: (rule) => rule.required()}),
    defineField({name: "breadcrumbTitle", title: "Breadcrumb title", type: "string", description: "Optional shorter label for breadcrumb trails."}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title", maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: "excerpt", title: "Excerpt", type: "text", rows: 3}),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({type: "block"}), defineArrayMember({type: "image", options: {hotspot: true}})],
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {title: "title", subtitle: "section"},
    prepare: ({title, subtitle}) => ({title, subtitle: subtitle ? subtitle.replace(/-/g, " ") : "Page"})
  }
});
