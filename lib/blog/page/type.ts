import { BlogConfig } from "../config/type";
import { BlogContent } from "../content/type";

export interface BlogPageProps {
  params: {
    segments: string[];
  };
}

export interface BlogPage {
  config: BlogConfig;
  content: BlogContent;
}
