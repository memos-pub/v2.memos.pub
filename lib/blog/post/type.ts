import { BlogMeta } from "../content/type";

export interface BlogPost {
  type: "post";
  html: string;
  meta: BlogMeta;
}
