import {createClient} from "next-sanity";
import {apiVersion, dataset, hasRequiredEnv, projectId, readToken} from "@/sanity/env";

export const client = createClient({
  projectId: projectId || "placeholder-project-id",
  dataset: dataset || "production",
  apiVersion,
  useCdn: !readToken,
  token: readToken || undefined,
  perspective: "published",
  stega: {enabled: false}
});

export async function sanityFetch<T>({query, params = {}, tags = []}: {query: string; params?: Record<string, unknown>; tags?: string[]}): Promise<T | null> {
  if (!hasRequiredEnv) {
    return null;
  }

  return client.fetch<T>(query, params, {next: {tags}});
}
