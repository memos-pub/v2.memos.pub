import { getGithubContent, GitHubContent } from "#/lib/github/content";
import "server-only";
import { BlogParams } from "../type";
import { BlogConfig } from "./type";

const fallback: BlogConfig = {
  readme: "show",
  color: "tailwind",
  layout: "tailwind",
  font: "inter",
};

export const getBlogConfig = async (
  params: BlogParams
): Promise<BlogConfig> => {
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
    const stored = JSON.parse(text) as Partial<BlogConfig>;
    const config: BlogConfig = { ...fallback, ...stored };
    return config;
  } catch (e: unknown) {
    console.warn("config is invalid");
    return fallback;
  }
};
