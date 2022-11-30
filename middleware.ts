import type { NextMiddleware } from "next/server";
import { customDomainMiddleware } from "./lib/middleware/custom-domain";

/*
Given "https://one.two.com:1234/three"

host: 'one.two.com:1234',
hostname: 'one.two.com',
href: 'https://one.two.com:1234/three',
origin: 'https://one.two.com:1234',
pathname: '/three',
*/

export const middleware: NextMiddleware = async (request, event) => {
  const custom = customDomainMiddleware(request, event);
  if (custom) return custom;
};
