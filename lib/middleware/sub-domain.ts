import { NextMiddleware, NextResponse } from "next/server";

// Does not work if a root domain is a sub domain of another
// (e.g. ["memos.pub", "dev.memos.pub"] won't work)
const ROOT_DOMAINS = [
  "memos.pub", // Production
  "memos-pub.vercel.app", // Staging
];

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
