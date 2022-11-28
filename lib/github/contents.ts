import { cache } from "react";
import "server-only";
import { octokit } from "./octokit";

interface Params {
  owner: string;
  repo: string;
  path: string;
}

export const getGHContents = cache(async (params: Params) => {
  const { owner, path, repo } = params;
  const url = "GET /repos/{owner}/{repo}/contents/{path}";
  return octokit.request(url, { owner, path, repo });
});
