import "server-only";
import { getBlogConfig } from "../config/get";
import { getBlogContent } from "../content/get";
import { BlogPage, BlogPageParams } from "./type";

export const getBlogPage = async (
  params: BlogPageParams
): Promise<BlogPage> => {
  const { owner } = params;
  const repo = params.repo ?? owner; // Profile repo
  const path = params.path ?? ""; // Root

  const [config, content] = await Promise.all([
    getBlogConfig({ owner, repo }),
    getBlogContent({ owner, repo, path }),
  ]);

  return { config, content };
};
