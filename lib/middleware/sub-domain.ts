import { NextMiddleware, NextResponse } from "next/server";
import { getMiddlewareHost } from "./host";

// Subdomain must come before parent domain
const ROOT_HOSTS = [
  "dev.memos.pub", // Staging
  "memos.pub", // Production
  "localhost:3000", // Local dev
];

export const subDomainMiddleware: NextMiddleware = (request) => {
  const url = Object.freeze(request.nextUrl);
  const host = getMiddlewareHost(request);

  // At root
  if (ROOT_HOSTS.includes(host)) return;

  const root = ROOT_HOSTS.find((domain) => host.endsWith(`.${domain}`));
  if (root === undefined) {
    console.warn(`Unknown root: "${host}"`);
    return;
  }

  // thien-do.memos.pub
  // ^------^ owner
  const owner = host.replace(`.${root}`, "");

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
