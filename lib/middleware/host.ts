import type { NextRequest } from "next/server";

/**
 * Returns the original host. This is useful in local development where the
 * host is mapped via something like /etc/hosts.
 *
 * In other words:
 * - browser:                     thien-do.localhost:3000/foo/bar/baz
 * - request.nextUrl.host:        localhost:3000
 * - request.headers.get("host"): thien-do.localhost:3000 <- we need this
 */
export const getMiddlewareHost = (request: NextRequest): string => {
  const host = request.headers.get("host");
  if (host === null) {
    console.warn(`Host not found`);
    return "memos.pub";
  }
  return host;
};
