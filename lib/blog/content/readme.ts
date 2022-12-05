import "server-only";
import { getGithubContent, GitHubContent } from "#/lib/github/content";
import { BlogPost } from "../post/type";
import { parseBlogPost } from "../post/parse";
import { BlogParams } from "../type";
import { OctokitResponse } from "@octokit/types";

const fetchReadmes = async (
  params: BlogParams
): Promise<GitHubContent | null> => {
  const { owner, path: _path, repo } = params;

  const promises = ["README.md", "readme.md"].map((file) => {
    // Avoid leading "/" if at root (path === "")
    const path = [_path, file].filter((p) => p !== "").join("/");
    return getGithubContent({ owner, repo, path });
  });
  const responses = await Promise.allSettled(promises);
  const success = responses.find((r) => r.status === "fulfilled") as
    | undefined
    | PromiseFulfilledResult<OctokitResponse<GitHubContent>>;
  if (success === undefined) return null;
  return success.value.data;
};

export const getBlogReadme = async (
  params: BlogParams
): Promise<BlogPost | null> => {
  const data = await fetchReadmes(params);
  // Maybe "path" is a file, or a folder without README
  if (data === null) return null;

  if (Array.isArray(data)) {
    console.warn("readme is folder");
    return null;
  }
  if (data.type !== "file") {
    console.warn("readme is not file");
    return null;
  }

  try {
    const post = await parseBlogPost(data);
    return post;
  } catch (e: unknown) {
    console.warn("readme is invalid", e);
    return null;
  }
};
