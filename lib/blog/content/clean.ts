import { getGithubContent, GitHubContent } from "#/lib/github/content";
import "server-only";
import { parseBlogPost } from "../post/parse";
import { BlogPost } from "../post/type";
import { BlogParams } from "../type";

export const getBlogClean = async (
  params: BlogParams
): Promise<BlogPost | null> => {
  const { owner, repo, path: _path } = params;

  // File already includes extension (not clean url)
  if (_path.endsWith(".md")) return null;

  // We're at root, so not a file
  if (_path === "") return null;

  let data: GitHubContent;
  try {
    const path = `${_path}.md`;
    const response = await getGithubContent({ owner, repo, path });
    data = response.data;
  } catch (error) {
    // Maybe "path" is a file, or a folder without README
    return null;
  }

  if (Array.isArray(data)) {
    console.warn("clean is folder");
    return null;
  }
  if (data.type !== "file") {
    console.warn("clean is not file");
    return null;
  }

  try {
    const post = await parseBlogPost(data);
    return post;
  } catch (e: unknown) {
    console.warn("clean is invalid");
    return null;
  }
};
