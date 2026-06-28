import {revalidateTag} from "next/cache";
import {NextRequest, NextResponse} from "next/server";

const REVALIDATE_TAGS = ["siteSettings", "homePage", "page", "post"] as const;

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const providedSecret = request.nextUrl.searchParams.get("secret");

  if (!secret) {
    return NextResponse.json({message: "Missing SANITY_REVALIDATE_SECRET on the server."}, {status: 500});
  }

  if (providedSecret !== secret) {
    return NextResponse.json({message: "Invalid revalidation secret."}, {status: 401});
  }

  for (const tag of REVALIDATE_TAGS) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    revalidated: true,
    tags: REVALIDATE_TAGS
  });
}
