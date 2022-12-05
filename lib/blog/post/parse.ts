import { parseMarkdown } from "#/lib/markdown/parse";
import { components } from "@octokit/openapi-types";
import { BlogPost } from "./type";

type Raw = components["schemas"]["content-file"];

export const parseBlogPost = async (raw: Raw): Promise<BlogPost> => {
  const markdown = Buffer.from(raw.content, "base64").toString();
  const { html, meta } = await parseMarkdown(markdown);
  const file: BlogPost = { type: "post", html, meta };
  return file;
};
