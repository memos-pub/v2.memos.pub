import { parseMarkdown } from "../markdown/parse";
import { components } from "@octokit/openapi-types";

export interface BlogFile {
  type: "file";
  content: string;
}

export const parseBlogFile = async (
  raw: components["schemas"]["content-file"]
): Promise<BlogFile> => {
  const markdown = Buffer.from(raw.content, "base64").toString();
  const html = await parseMarkdown(markdown);
  const file: BlogFile = {
    type: "file",
    content: html,
  };
  return file;
};
