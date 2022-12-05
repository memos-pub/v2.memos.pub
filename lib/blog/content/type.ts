import { BlogList } from "../list/type";
import { BlogPost } from "../post/type";

export interface BlogError {
  type: "error";
  message: string;
}

export interface BlogMeta {
  title: string | null;
  description: string | null;
}

export type BlogContent = BlogPost | BlogList | BlogError;
