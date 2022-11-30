import type { NextMiddleware } from "next/server";
import { customDomainMiddleware } from "./custom-domain";
import { subDomainMiddleware } from "./sub-domain";

/*
Given "https://one.two.com:1234/three"

host: 'one.two.com:1234',
hostname: 'one.two.com',
href: 'https://one.two.com:1234/three',
origin: 'https://one.two.com:1234',
pathname: '/three',
*/

const EXCLUDES = ["/favicon.ico", "/_next/static", "/api"];

export const appMiddleware: NextMiddleware = async (...params) => {
  const path = params[0].nextUrl.pathname;
  if (EXCLUDES.some((exclude) => path.startsWith(exclude))) return;

  const custom = customDomainMiddleware(...params);
  if (custom) return custom;

  const sub = subDomainMiddleware(...params);
  if (sub) return sub;
};
