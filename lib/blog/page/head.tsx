import { getBlogContent } from "../content/get";
import { parseBlogPageParams } from "./parse";
import { BlogPageProps } from "./type";

export const BlogPageHead = async (props: BlogPageProps) => {
  const params = parseBlogPageParams(props);
  const { meta } = await getBlogContent(params);

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description}></meta>
      <link
        rel="icon"
        href={`//f.viole.in/api/favicon?user=${params.owner}&size=48`}
      />
    </>
  );
};
