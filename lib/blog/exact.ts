import "server-only";
import { getGithubContent, GitHubContent } from "../github/content";
import {
  BlogContent,
  BlogContentDir,
  BlogContentEntry,
  BlogContentFile,
} from "./content";
import { BlogPageParams } from "./page";
import type { components } from "@octokit/openapi-types";
import { compileToHTML } from "../md/compile";

type EntryRaw = components["schemas"]["content-directory"][number];

const toEntry = (raw: EntryRaw): BlogContentEntry | null => {
  const { type, name } = raw;
  if (type === "submodule") return null;
  if (type === "symlink") return null;
  return { type, name };
};

export const getBlogExact = async (
  params: Required<BlogPageParams>
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
    const dir: BlogContentDir = {
      type: "dir",
      entries: data
        .map(toEntry)
        .filter((e): e is BlogContentEntry => e !== null),
      readme: null, // TBA, see lib/blog/content
    };
    return dir;
  }

  if (data.type !== "file") {
    console.warn("exact is not file");
    return null;
  }

  try {
    const content = Buffer.from(data.content, "base64").toString();
    const code = await compileToHTML({ content });
    const file: BlogContentFile = { type: "file", content: code };
    return file;
  } catch (e: unknown) {
    console.warn("exact is invalid");
    return null;
  }
};
