import { DOMAINS } from "#/DOMAINS";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

export const customDomainMiddleware: NextMiddleware = (request) => {
  const url = request.nextUrl.clone();

  const target = DOMAINS.get(url.hostname);
  if (target === undefined) return;

  // `pathname` starts with `/`
  url.pathname = `/github/${target}${url.pathname}`;
  return NextResponse.rewrite(url);
};
