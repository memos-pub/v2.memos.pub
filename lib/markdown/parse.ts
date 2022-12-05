import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import "server-only";
import { unified } from "unified";
import { rehypeStarryNight } from "./rehype-starry-night";

export const parseMarkdown = async (raw: string): Promise<string> => {
  const compiler = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStarryNight)
    .use(rehypeStringify);
  const result = await compiler.process(raw);
  const html = String(result);

  return html;
};
