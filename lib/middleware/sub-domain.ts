import { NextMiddleware, NextResponse } from "next/server";

// This is used with "find" and "endsWith" so ensure sub domains are always
// listed first
const ROOT_DOMAINS = ["dev.memos.pub", "memos.pub"];

export const subDomainMiddleware: NextMiddleware = (request) => {
  const url = request.nextUrl.clone();

  const root = ROOT_DOMAINS.find((domain) => {
    return url.hostname.endsWith(`.${domain}`);
  });
  if (root === undefined) return;

  // thien-do.memos.pub
  // ^------^ owner
  const owner = url.hostname.replace(`.${root}`, "");
  // "pathname" starts with "/"
  url.pathname = `/github/${owner}${url.pathname}`;
  return NextResponse.rewrite(url);
};
