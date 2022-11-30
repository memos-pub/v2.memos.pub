import { getGithubContent, GitHubContent } from "#/lib/github/content";
import "server-only";
import { parseBlogList } from "../list/parse";
import { parseBlogPost } from "../post/parse";
import { BlogParams } from "../type";
import { BlogContent } from "./type";

export const getBlogExact = async (
  params: BlogParams
): Promise<BlogContent | null> => {
  const { owner, repo, path } = params;

  let data: GitHubContent;
  try {
    const response = await getGithubContent({ owner, repo, path });
    data = response.data;
  } catch (error) {
    // Maybe "path" is a file with clean url (see lib/blog/clean)
    return null;
  }

  if (Array.isArray(data)) {
    const list = parseBlogList(data);
    return list;
  }

  if (data.type !== "file") {
    console.warn("exact is not file");
    return null;
  }

  try {
    const post = parseBlogPost(data);
    return post;
  } catch (e: unknown) {
    console.warn("exact is invalid");
    return null;
  }
};
