import { NextMiddleware, NextResponse } from "next/server";

// Subdomain must come before parent domain
const ROOT_DOMAINS = [
  "dev.memos.pub", // Dev
  "memos.pub", // Production
];

export const subDomainMiddleware: NextMiddleware = (request) => {
  const url = request.nextUrl.clone();

  // At root
  if (ROOT_DOMAINS.includes(url.hostname)) return;

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
