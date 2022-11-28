import "server-only";
import { getGhContent } from "../github/content";
import { parseBlogConfig } from "./config";

export interface BlogContentPath {
  owner: string;
  repo?: string;
  path?: string;
}

export const getBlogContent = async (raw: BlogContentPath) => {
  const { owner } = raw;
  const repo = raw.repo ?? owner; // Profile repo
  const path = raw.path ?? ""; // Root

  const promises = [
    "memos.pub.json", // Config
    path, // File or folder
    `${path}/README.md`, // Folder README
    `${path}.md`, // File with clean url
  ].map((path) => getGhContent({ owner, repo, path }));

  const data = await Promise.allSettled(promises);
  // const [config, self, readme, clean] = data;
  const config = parseBlogConfig(data[0]);
  return data;
};
