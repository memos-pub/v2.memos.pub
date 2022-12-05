import "server-only";
import { BlogList } from "../list/type";
import { BlogParams } from "../type";
import { getBlogClean } from "./clean";
import { getBlogExact } from "./exact";
import { getBlogReadme } from "./readme";
import { BlogContent, BlogError } from "./type";
import { cache } from "react";

const NOT_FOUND: BlogError = {
  type: "error",
  message: "Not found",
};

// React's cache compares a function params so we can't use objects as params
// as there's no way to share them between "head" and "page" at the same level.
const _getBlogContent = async (_params: string): Promise<BlogContent> => {
  const params = JSON.parse(_params) as BlogParams;

  const [exact, clean, readme] = await Promise.all([
    getBlogExact(params),
    getBlogClean(params),
    getBlogReadme(params),
  ]);

  if (exact === null) {
    // Maybe the path is a file with clean url
    return clean ?? NOT_FOUND;
  }

  if (exact.type === "post") return exact;
  if (exact.type === "error") return exact;

  // Exact is a list now
  const list: BlogList = { ...exact, readme };
  if (readme) list.meta = readme.meta;
  return list;
};

export const getBlogContent = cache(_getBlogContent);
