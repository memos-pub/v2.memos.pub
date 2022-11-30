import { NextMiddleware, NextResponse } from "next/server";

// This is used with "find" and "endsWith" so ensure sub domains are always
// listed first
const ROOT_DOMAINS = ["dev.memos.pub", "memos.pub"];

export const subDomainMiddleware: NextMiddleware = (request) => {
  const url = request.nextUrl.clone();

  const root = ROOT_DOMAINS.find((domain) => {
    console.log("hostname", url.hostname);
    return url.hostname.endsWith(`.${domain}`);
  });
  if (root === undefined) return;

  console.log({ root });

  // thien-do.memos.pub
  // ^------^ owner
  const owner = url.hostname.replace(`.${root}`, "");
  // "pathname" starts with "/"
  console.log({ owner });
  console.log("pathname", url.pathname);
  url.pathname = `/github/${owner}${url.pathname}`;
  return NextResponse.rewrite(url);
};
