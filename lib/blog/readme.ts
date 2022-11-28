import "server-only";
import { getGithubContent, GitHubContent } from "../github/content";
import { BlogContentFile } from "./content";
import { BlogPageParams } from "./page";

export const getBlogReadme = async (
  params: Required<BlogPageParams>
): Promise<BlogContentFile | null> => {
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
    const content = Buffer.from(data.content, "base64").toString();
    const readme: BlogContentFile = { type: "file", content };
    return readme;
  } catch (e: unknown) {
    console.warn("readme is invalid");
    return null;
  }
};
