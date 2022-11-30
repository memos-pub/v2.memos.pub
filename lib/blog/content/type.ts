import { BlogList } from "../list/type";
import { BlogPost } from "../post/type";

export interface BlogError {
  type: "error";
  message: string;
}

export type BlogContent = BlogPost | BlogList | BlogError;
