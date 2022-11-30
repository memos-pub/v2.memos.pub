import "server-only";
import { getGithubContent, GitHubContent } from "#/lib/github/content";
import { BlogPost } from "../post/type";
import { parseBlogPost } from "../post/parse";
import { BlogParams } from "../type";

export const getBlogReadme = async (
  params: BlogParams
): Promise<BlogPost | null> => {
  const { owner, repo } = params;
  // Avoid leading "/" if at root (path === "")
  const path = [params.path, "README.md"].filter((p) => p !== "").join("/");

  let data: GitHubContent;
  try {
    const response = await getGithubContent({ owner, repo, path });
    data = response.data;
  } catch (error) {
    // Maybe "path" is a file, or a folder without README
    return null;
  }

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
    console.warn("readme is invalid");
    return null;
  }
};
