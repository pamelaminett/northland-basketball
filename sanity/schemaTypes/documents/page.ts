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
    defineField({
      name: "bannerImage",
      title: "Banner image",
      type: "image",
      options: {hotspot: true},
      fields: [defineField({name: "alt", title: "Alt text", type: "string"})]
    }),
    defineField({
      name: "sidebarNewsHeading",
      title: "Sidebar news heading",
      type: "string",
      initialValue: "Latest News"
    }),
    defineField({
      name: "sidebarNewsTags",
      title: "Sidebar news tags",
      description: "Posts with any of these tags will appear in the right sidebar on this page.",
      type: "array",
      of: [defineArrayMember({type: "string"})],
      options: {layout: "tags"}
    }),
    defineField({
      name: "facebookFeeds",
      title: "Facebook feeds",
      description: "Add one or more Facebook page feeds for this page, useful for regional pages with multiple associated clubs or communities.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
            defineField({
              name: "pageUrl",
              title: "Facebook page URL",
              type: "url",
              validation: (rule) => rule.required().uri({scheme: ["http", "https"]})
            })
          ],
          preview: {
            select: {title: "title", subtitle: "pageUrl"},
            prepare: ({title, subtitle}) => ({title, subtitle})
          }
        })
      ]
    }),
    defineField({
      name: "downloads",
      title: "Downloads",
      description: "Upload PDFs or other files and link to them from this page.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
            defineField({name: "description", title: "Description", type: "text", rows: 2}),
            defineField({
              name: "file",
              title: "File",
              type: "file",
              options: {accept: ".pdf,.doc,.docx,.xls,.xlsx,.csv"}
            })
          ],
          preview: {
            select: {title: "title", subtitle: "file.asset.originalFilename"},
            prepare: ({title, subtitle}) => ({title, subtitle})
          }
        })
      ]
    }),
    defineField({
      name: "accordionYearGroups",
      title: "Accordion year groups",
      description: "Create year sections like 2026, 2025, and add team accordions inside each year.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "title", title: "Year title", type: "string", validation: (rule) => rule.required()}),
            defineField({
              name: "sections",
              title: "Accordion sections",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
                    defineField({
                      name: "body",
                      title: "Body",
                      type: "array",
                      of: [defineArrayMember({type: "block"}), defineArrayMember({type: "image", options: {hotspot: true}})]
                    })
                  ],
                  preview: {
                    select: {title: "title"},
                    prepare: ({title}) => ({title})
                  }
                })
              ]
            })
          ],
          preview: {
            select: {title: "title", count: "sections.length"},
            prepare: ({title, count}) => ({
              title,
              subtitle: `${count || 0} team sections`
            })
          }
        })
      ]
    }),
    defineField({
      name: "accordionSections",
      title: "Accordion sections",
      description: "Legacy flat accordion list. Prefer Accordion year groups if you want sections grouped under each year.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [defineArrayMember({type: "block"}), defineArrayMember({type: "image", options: {hotspot: true}})]
            })
          ],
          preview: {
            select: {title: "title"},
            prepare: ({title}) => ({title})
          }
        })
      ]
    }),
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
