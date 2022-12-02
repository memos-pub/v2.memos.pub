import rehypeStringify from "rehype-stringify";
import fs from "node:fs/promises";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { rehypeStarryNight } from "./highlight";
import "server-only";
import { unified } from "unified";

export const parseMarkdown = async (raw: string): Promise<string> => {
  const compiler = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStarryNight)
    .use(rehypeStringify);
  const result = await compiler.process(
    await fs.readFile("./lib/markdown/test.md")
  );
  const html = String(result);

  return html;
};
