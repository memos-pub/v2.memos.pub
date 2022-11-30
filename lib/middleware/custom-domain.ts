import { DOMAINS } from "#/DOMAINS";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

export const customDomainMiddleware: NextMiddleware = (request) => {
  const { nextUrl } = request;

  const target = DOMAINS.get(nextUrl.hostname);
  if (target === undefined) return;

  const url = nextUrl.clone();
  // `url.pathname` starts with `/`
  url.pathname = `/github/${target}${nextUrl.pathname}`;
  console.log(url.pathname);
  return NextResponse.rewrite(url);
};
