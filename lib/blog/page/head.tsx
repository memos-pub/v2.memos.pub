import { getBlogContent } from "../content/get";
import { BlogContent } from "../content/type";
import { BlogParams } from "../type";
import { parseBlogPageParams } from "./parse";
import { BlogPageProps } from "./type";

const getTitle = (content: BlogContent, params: BlogParams): string => {
  const { path, repo } = params;
  if (content.type === "error") return "Error";
  if (content.meta.title) return content.meta.title;
  const file = path.split("/").at(-1);
  if (file) return file;
  return repo;
};

const getDescription = (content: BlogContent): string => {
  if (content.type === "error") return content.message;
  if (content.meta.description) return content.meta.description;
  return "";
};

const getIcon = (params: BlogParams): string => {
  return `//f.viole.in/api/favicon?user=${params.owner}&size=48`;
};

export const BlogPageHead = async (props: BlogPageProps) => {
  const params = parseBlogPageParams(props);
  const content = await getBlogContent(JSON.stringify(params));
  return (
    <>
      <title>{getTitle(content, params)}</title>
      <meta name="description" content={getDescription(content)} />
      <link rel="icon" href={getIcon(params)} />
    </>
  );
};
