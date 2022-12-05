import { getBlogContent } from "../content/get";
import { BlogContent, BlogMeta } from "../content/type";
import { BlogParams } from "../type";
import { parseBlogPageParams } from "./parse";
import { BlogPageProps } from "./type";

const getMeta = (
  content: BlogContent,
  params: BlogParams
): { title: string; description: string | null } => {
  if (content.type === "error") {
    return { title: "Error", description: content.message };
  }

  const { path, repo } = params;
  // "||" because it could be an empty string
  const file = path.split("/").at(-1) || repo;

  const meta: BlogMeta | null =
    content.type === "post" ? content.meta : content.readme?.meta ?? null;

  return {
    title: meta?.title ?? file,
    description: meta?.description ?? null,
  };
};

const getIcon = (params: BlogParams): string => {
  return `//f.viole.in/api/favicon?user=${params.owner}&size=48`;
};

export const BlogPageHead = async (props: BlogPageProps) => {
  const params = parseBlogPageParams(props);
  const content = await getBlogContent(JSON.stringify(params));
  const { title, description } = getMeta(content, params);
  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="icon" href={getIcon(params)} />
    </>
  );
};
