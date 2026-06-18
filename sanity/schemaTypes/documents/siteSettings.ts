import {defineArrayMember, defineField, defineType} from "sanity";

function hasPageReference(parent: unknown) {
  return Boolean((parent as {page?: unknown} | undefined)?.page);
}

function hasHref(parent: unknown) {
  return Boolean((parent as {href?: string} | undefined)?.href);
}

function hasChildren(parent: unknown) {
  return Boolean((parent as {children?: unknown[]} | undefined)?.children?.length);
}

const childLinkFields = [
  defineField({name: "label", title: "Label", type: "string"}),
  defineField({
    name: "page",
    title: "Existing page",
    type: "reference",
    to: [{type: "page"}],
    description: "Pick an existing page to automatically use its title and route.",
    hidden: ({parent}) => hasHref(parent)
  }),
  defineField({
    name: "href",
    title: "Custom URL",
    type: "string",
    description: "Use this for custom routes like /news or external links.",
    hidden: ({parent}) => hasPageReference(parent),
    validation: (rule) => rule.custom((value, context) => {
      if (value || hasPageReference(context.parent)) {
        return true;
      }

      return "Add either an existing page or a custom URL.";
    })
  }),
  defineField({name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false})
];

const parentLinkFields = [
  defineField({name: "label", title: "Label", type: "string"}),
  defineField({
    name: "page",
    title: "Existing page",
    type: "reference",
    to: [{type: "page"}],
    description: "Pick an existing page to automatically use its title and route.",
    hidden: ({parent}) => hasHref(parent) || hasChildren(parent)
  }),
  defineField({
    name: "href",
    title: "Custom URL",
    type: "string",
    description: "Use this for custom routes like /news or external links.",
    hidden: ({parent}) => hasPageReference(parent) || hasChildren(parent),
    validation: (rule) => rule.custom((value, context) => {
      if (value || hasPageReference(context.parent) || hasChildren(context.parent)) {
        return true;
      }

      return "Add an existing page, a custom URL, or dropdown items.";
    })
  }),
  defineField({name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false}),
  defineField({
    name: "children",
    title: "Dropdown items",
    type: "array",
    description: "Add submenu links shown on hover under this top-level item.",
    of: [
      defineArrayMember({
        type: "object",
        preview: {
          select: {
            label: "label",
            pageTitle: "page.title",
            href: "href"
          },
          prepare: ({label, pageTitle, href}) => ({
            title: label || pageTitle || "Dropdown item",
            subtitle: href || (pageTitle ? "Linked page" : "No destination set")
          })
        },
        fields: childLinkFields
      })
    ]
  })
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", initialValue: "Site Settings", validation: (rule) => rule.required()}),
    defineField({
      name: "headerLogo",
      title: "Header logo",
      type: "image",
      fieldset: "header",
      options: {hotspot: true},
      fields: [defineField({name: "alt", title: "Alt text", type: "string"})]
    }),
    defineField({
      name: "navigation",
    title: "Navigation",
    type: "array",
    fieldset: "header",
    description: "Top-level navigation. Add dropdown items inside any parent item to create hover menus.",
    of: [
      defineArrayMember({
        type: "object",
        preview: {
          select: {
            label: "label",
            pageTitle: "page.title",
            href: "href",
            childCount: "children.length"
          },
          prepare: ({label, pageTitle, href, childCount}) => ({
            title: label || pageTitle || "Navigation item",
            subtitle: childCount
              ? `${childCount} dropdown item${childCount === 1 ? "" : "s"}`
              : (href || (pageTitle ? "Linked page" : "No destination set"))
          })
        },
        fields: parentLinkFields,
        validation: (rule) => rule.custom((value) => {
          const item = value as {page?: unknown; href?: string; children?: unknown[]} | undefined;
          if (item?.page || item?.href || item?.children?.length) {
            return true;
          }

          return "Add a page, a custom URL, or at least one dropdown item.";
        })
      })
    ]
  }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({type: "object", fields: [defineField({name: "label", title: "Label", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string", validation: (rule) => rule.required()})]})]
    }),
    defineField({name: "footerLinks", title: "Footer links", type: "array", of: [defineArrayMember({type: "object", fields: childLinkFields})]}),
    defineField({name: "address", title: "Address", type: "array", of: [defineArrayMember({type: "block"})]}),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [defineArrayMember({type: "object", fields: [defineField({name: "name", title: "Name", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string"})]})]
    })
  ],
  fieldsets: [
    {name: "header", title: "Header"},
    {name: "footer", title: "Footer"}
  ],
  preview: {prepare: () => ({title: "Site Settings"})}
});
