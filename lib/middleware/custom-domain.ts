import { DOMAINS } from "#/DOMAINS";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

export const customDomainMiddleware: NextMiddleware = (request) => {
  const url = request.nextUrl.clone();

  const prefix = DOMAINS.get(url.hostname);
  if (prefix === undefined) return;

  url.pathname = `/_blog/${prefix}/${url.pathname}`;
  return NextResponse.rewrite(url);
};
