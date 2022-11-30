import "server-only";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
interface Props {
  content: string;
}
export const compileToHTML = async (props: Props): Promise<string> => {
  const compiler = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify);
  const html = await compiler.process(props.content);
  return String(html);
};
