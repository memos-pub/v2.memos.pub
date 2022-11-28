import "server-only";
import { octokit } from "./octokit";
import type { operations } from "@octokit/openapi-types";
import type { OctokitResponse } from "@octokit/types";

export interface GhContentPath {
  owner: string;
  repo: string;
  path: string;
}

export type GhContentResponse =
  operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

export const getGhContent = async (
  params: GhContentPath
): Promise<OctokitResponse<GhContentResponse>> => {
  const { owner, path, repo } = params;
  const url = "GET /repos/{owner}/{repo}/contents/{path}";
  return octokit.request(url, { owner, path, repo });
};
