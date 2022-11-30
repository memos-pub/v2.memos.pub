import { BlogConfig } from "../config/type";
import { BlogContent } from "../content/type";

export interface BlogPageParams {
  owner: string;
  repo?: string;
  path?: string;
}

export interface BlogPage {
  config: BlogConfig;
  content: BlogContent;
}
