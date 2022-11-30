import "server-only";
import { getGithubContent, GitHubContent } from "../github/content";
import { compileToHTML } from "../md/compile";
import { BlogContentFile } from "./content";
import { BlogPageParams } from "./page";

export const getBlogClean = async (
  params: Required<BlogPageParams>
): Promise<BlogContentFile | null> => {
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
    const content = Buffer.from(data.content, "base64").toString();
    const clean: BlogContentFile = { type: "file", content };
    const code = await compileToHTML({ content });
    return { type: "file", content: code };
  } catch (e: unknown) {
    console.warn("clean is invalid");
    return null;
  }
};
