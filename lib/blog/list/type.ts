import { BlogMeta } from "../content/type";
import { BlogPost } from "../post/type";

export interface BlogListEntry {
  type: "post" | "list";
  name: string;
}

export interface BlogList {
  type: "list";
  entries: BlogListEntry[];
  readme: BlogPost | null;
  meta: BlogMeta;
}
