import "server-only";
import { getBlogClean } from "./clean";
import { getBlogExact } from "./exact";
import { BlogPageParams } from "./page";
import { getBlogReadme } from "./readme";

export interface BlogContentEntry {
  type: "file" | "dir";
  name: string;
}

export interface BlogContentFile {
  type: "file";
  content: string;
}

export interface BlogContentDir {
  type: "dir";
  entries: BlogContentEntry[];
  readme: BlogContentFile | null;
}

export interface BlogContentError {
  type: "error";
  message: string;
}

export type BlogContent = BlogContentDir | BlogContentFile | BlogContentError;

const NOT_FOUND: BlogContentError = {
  type: "error",
  message: "Not found",
};

export const getBlogContent = async (
  params: Required<BlogPageParams>
): Promise<BlogContent> => {
  const [exact, clean, readme] = await Promise.all([
    getBlogExact(params),
    getBlogClean(params),
    getBlogReadme(params),
  ]);

  if (exact === null) {
    // Maybe the path is a file with clean url
    return clean ?? NOT_FOUND;
  }

  if (exact.type === "file") return exact;
  if (exact.type === "error") return exact;

  // Exact is dir now
  const dir = { ...exact, readme };
  return dir;
};
