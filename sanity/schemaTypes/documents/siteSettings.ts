import {defineArrayMember, defineField, defineType} from "sanity";

const linkFields = [
  defineField({name: "label", title: "Label", type: "string", validation: (rule) => rule.required()}),
  defineField({name: "href", title: "Href", type: "string", validation: (rule) => rule.required()}),
  defineField({name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false})
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", initialValue: "Site Settings", validation: (rule) => rule.required()}),
    defineField({name: "navigation", title: "Navigation", type: "array", of: [defineArrayMember({type: "object", fields: linkFields})]}),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({type: "object", fields: [defineField({name: "label", title: "Label", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string", validation: (rule) => rule.required()})]})]
    }),
    defineField({name: "footerLinks", title: "Footer links", type: "array", of: [defineArrayMember({type: "object", fields: linkFields})]}),
    defineField({name: "address", title: "Address", type: "array", of: [defineArrayMember({type: "block"})]}),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [defineArrayMember({type: "object", fields: [defineField({name: "name", title: "Name", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string"})]})]
    })
  ],
  preview: {prepare: () => ({title: "Site Settings"})}
});
