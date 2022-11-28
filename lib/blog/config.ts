import "server-only";
import { getGithubContent, GitHubContent } from "../github/content";

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

interface Params {
  owner: string;
  repo: string;
}

export const getBlogConfig = async (params: Params): Promise<BlogConfig> => {
  const { owner, repo } = params;
  const path = "memos.pub.json";

  let data: GitHubContent;
  try {
    const response = await getGithubContent({ owner, repo, path });
    data = response.data;
  } catch (error) {
    // It's ok to have no config
    return fallback;
  }

  if (Array.isArray(data)) {
    console.warn("config is folder");
    return fallback;
  }

  if (data.type !== "file") {
    console.warn("config is not file");
    return fallback;
  }

  try {
    const text = Buffer.from(data.content, "base64").toString();
    const config = JSON.parse(text) as BlogConfig;
    return config;
  } catch (e: unknown) {
    console.warn("config is invalid");
    return fallback;
  }
};
