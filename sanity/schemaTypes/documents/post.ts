import {defineArrayMember, defineField, defineType} from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title", maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: "category", title: "Category", type: "string"}),
    defineField({name: "publishedAt", title: "Published at", type: "datetime", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required()}),
    defineField({name: "excerpt", title: "Excerpt", type: "text", rows: 3}),
    defineField({name: "mainImage", title: "Main image", type: "image", options: {hotspot: true}}),
    defineField({name: "body", title: "Body", type: "array", of: [defineArrayMember({type: "block"}), defineArrayMember({type: "image", options: {hotspot: true}})]})
  ],
  orderings: [{title: "Newest first", name: "publishedAtDesc", by: [{field: "publishedAt", direction: "desc"}]}],
  preview: {select: {title: "title", subtitle: "category", media: "mainImage"}}
});
