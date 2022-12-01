import { DOMAINS } from "#/DOMAINS";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

export const customDomainMiddleware: NextMiddleware = (request) => {
  const url = Object.freeze(request.nextUrl);

  const prefix = DOMAINS.get(url.hostname);
  if (prefix === undefined) return;

  const next = url.clone();
  next.pathname = `/_blog/${prefix}/${url.pathname}`.replaceAll("//", "/");
  return NextResponse.rewrite(next);
};
