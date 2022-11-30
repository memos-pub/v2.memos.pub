import { getBlogConfig } from "../config/get";
import { getBlogContent } from "../content/get";
import { BlogPost } from "../post/post";
import { parseBlogPageParams } from "./parse";
import { BlogPageProps } from "./type";

export const BlogPage = async (props: BlogPageProps): Promise<JSX.Element> => {
  const params = parseBlogPageParams(props);

  const [config, content] = await Promise.all([
    getBlogConfig(params),
    getBlogContent(params),
  ]);

  switch (content.type) {
    case "post":
      return <BlogPost post={content} />;
    default:
      return (
        <div style={{ whiteSpace: "pre" }}>
          {JSON.stringify(content, null, 2)}
        </div>
      );
  }
};
