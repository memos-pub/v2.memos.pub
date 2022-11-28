import "server-only";
import { BlogConfig, getBlogConfig } from "./config";
import { BlogContent, getBlogContent } from "./content";

export interface BlogPageParams {
  owner: string;
  repo?: string;
  path?: string;
}

export interface BlogPage {
  config: BlogConfig;
  content: BlogContent;
}

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
