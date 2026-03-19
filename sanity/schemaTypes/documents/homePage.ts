import {defineArrayMember, defineField, defineType} from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", initialValue: "Homepage", validation: (rule) => rule.required()}),
    defineField({name: "heroHeading", title: "Hero heading", type: "string", initialValue: "WE ARE THE NORTH"}),
    defineField({name: "regions", title: "Regions", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "label", title: "Label", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string"})]})]}),
    defineField({name: "heroImages", title: "Hero images", type: "array", of: [defineArrayMember({type: "image", options: {hotspot: true}, fields: [defineField({name: "alt", title: "Alt text", type: "string"})]})], validation: (rule) => rule.max(3)}),
    defineField({name: "programmesHeading", title: "Programmes heading", type: "string", initialValue: "PLAY BASKETBALL AT EVERY LEVEL"}),
    defineField({name: "programmesBody", title: "Programmes body", type: "array", of: [defineArrayMember({type: "block"})]}),
    defineField({name: "programmeCards", title: "Programme cards", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Href", type: "string"}), defineField({name: "featured", title: "Featured", type: "boolean", initialValue: false})]})]}),
    defineField({name: "statement", title: "Statement", type: "string", initialValue: "AS THE GAME RISES, SO DO WE"}),
    defineField({name: "latestHeading", title: "Latest heading", type: "string", initialValue: "The Latest"})
  ],
  preview: {prepare: () => ({title: "Homepage"})}
});
