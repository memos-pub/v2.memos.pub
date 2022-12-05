import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import "server-only";
import { unified } from "unified";
import { markdownCode } from "./code";
import { markdownHeading } from "./heading";
import { markdownMeta } from "./meta";
interface Content {
  html: string;
  meta: {
    description: string;
    title: string;
  };
}
export const parseMarkdown = async (raw: string): Promise<Content> => {
  const compiler = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(markdownCode)
    .use(markdownMeta)
    .use(markdownHeading)
    .use(rehypeStringify);

  const result = await compiler.process(raw);
  const html = String(result);
  return {
    html,
    meta: {
      description: result.data.meta?.description ?? "",
      title: result.data.meta?.title ?? "",
    },
  };
};
