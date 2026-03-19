import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {apiVersion, dataset, projectId} from "./sanity/env";
import {schemaTypes} from "./sanity/schemaTypes";

const singletonTypes = new Set(["siteSettings", "homePage"]);

export default defineConfig({
  name: "default",
  title: "Northland Basketball",
  projectId: projectId || "placeholder-project-id",
  dataset: dataset || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem().title("Homepage").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() || ""))
          ])
    })
  ],
  schema: {
    types: schemaTypes
  },
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === "global") {
        return prev.filter((item) => item.templateId !== "siteSettings" && item.templateId !== "homePage");
      }
      return prev;
    },
    actions: (prev, {schemaType}) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({action}) => action !== "duplicate" && action !== "unpublish");
      }

      return prev;
    },
  }
});
