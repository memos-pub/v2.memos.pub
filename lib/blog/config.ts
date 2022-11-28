import { OctokitResponse } from "@octokit/types";
import "server-only";
import { GhContentResponse } from "../github/content";

/** What to do if the folder has a README */
export type BlogConfigReadme =
  /** Show the README before the file list. The README is NOT listed in the file list. */
  | "show"
  /** Don't show the README. The README is STILL listed in the file list. */
  | "hide"
  /** Show the README and hide the file list. */
  | "only";

export interface BlogConfig {
  readme: BlogConfigReadme;
}

const fallback: BlogConfig = {
  readme: "show",
};

type Raw = PromiseSettledResult<OctokitResponse<GhContentResponse>>;

export const parseBlogConfig = (raw: Raw): BlogConfig => {
  if (raw.status === "rejected") {
    // No config is expected
    return fallback;
  }

  const { data } = raw.value;
  if (Array.isArray(data)) {
    console.warn("config is folder");
    return fallback;
  }
  if (data.type !== "file") {
    console.warn("config is not file");
    return fallback;
  }

  const text = Buffer.from(data.content, "base64").toString();
  try {
    return JSON.parse(text) as BlogConfig;
  } catch (e: unknown) {
    console.warn("config is invalid");
    return fallback;
  }
};
