import fs from "node:fs/promises";
import path from "node:path";
import {createClient} from "@sanity/client";

const cwd = process.cwd();
const seedPath = path.join(cwd, "sanity/seed/site-settings.json");
const envPath = path.join(cwd, ".env.local");
const sanityConfigPath = path.join(cwd, ".config/sanity/config.json");

try {
  const envRaw = await fs.readFile(envPath, "utf8");
  for (const line of envRaw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1);
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
} catch {
  // Fall back to existing process.env when .env.local is unavailable.
}

try {
  if (!process.env.SANITY_WRITE_TOKEN) {
    const sanityConfigRaw = await fs.readFile(sanityConfigPath, "utf8");
    const sanityConfig = JSON.parse(sanityConfigRaw);
    if (sanityConfig?.authToken) {
      process.env.SANITY_WRITE_TOKEN = sanityConfig.authToken;
    }
  }
} catch {
  // Fall back to existing process.env when local Sanity CLI config is unavailable.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or a usable Sanity token.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-19",
  token,
  useCdn: false,
});

const raw = await fs.readFile(seedPath, "utf8");
const seed = JSON.parse(raw);

const current = await client.getDocument("siteSettings");

if (!current) {
  await client.create(seed);
  console.log("Created siteSettings from seed.");
  process.exit(0);
}

await client
  .patch("siteSettings")
  .set({
    title: seed.title,
    navigation: seed.navigation,
    socialLinks: seed.socialLinks,
    footerLinks: seed.footerLinks,
    address: seed.address,
    sponsors: seed.sponsors,
  })
  .commit();

console.log("Updated siteSettings navigation fields and preserved existing fields like headerLogo.");
