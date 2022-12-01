import { NextMiddleware, NextResponse } from "next/server";

// Subdomain must come before parent domain
const ROOT_DOMAINS = [
  "dev.memos.pub", // Dev
  "memos.pub", // Production
];

export const subDomainMiddleware: NextMiddleware = (request) => {
  const url = Object.freeze(request.nextUrl);

  // At root
  if (ROOT_DOMAINS.includes(url.hostname)) return;

  const root = ROOT_DOMAINS.find((domain) => {
    return url.hostname.endsWith(`.${domain}`);
  });
  if (root === undefined) {
    console.warn(`Unknown root: "${url.hostname}"`);
    return;
  }

  // thien-do.memos.pub
  // ^------^ owner
  const owner = url.hostname.replace(`.${root}`, "");

  // Repo is a must have
  if (url.pathname === "/") {
    const next = url.clone();
    next.pathname = `/${owner}`;
    // Redirect, not rewrite, to ensure the "repo" is always on the URL
    return NextResponse.redirect(next);
  }

  const next = url.clone();
  next.pathname = `/_blog/${owner}/${url.pathname}`.replaceAll("//", "/");
  return NextResponse.rewrite(next);
};
