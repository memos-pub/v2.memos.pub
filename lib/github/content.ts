import "server-only";
import { octokit } from "./octokit";
import type { operations } from "@octokit/openapi-types";
import type { OctokitResponse } from "@octokit/types";

export interface GithubContentParams {
  owner: string;
  repo: string;
  path: string;
}

export type GitHubContent =
  operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

export const getGithubContent = async (
  params: GithubContentParams
): Promise<OctokitResponse<GitHubContent>> => {
  const { owner, path, repo } = params;
  const url = "GET /repos/{owner}/{repo}/contents/{path}";
  return octokit.request(url, { owner, path, repo });
};
