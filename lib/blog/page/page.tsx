import { getBlogConfig } from "../config/get";
import { getBlogContent } from "../content/get";
import { BlogList } from "../list/list";
import { BlogPost } from "../post/post";
import { parseBlogPageParams } from "./parse";
import { BlogPageProps } from "./type";
import "@wooorm/starry-night/style/dark.css";
export const BlogPage = async (props: BlogPageProps): Promise<JSX.Element> => {
  const params = parseBlogPageParams(props);

  const [config, content] = await Promise.all([
    getBlogConfig(params),
    getBlogContent(params),
  ]);

  const body = (() => {
    switch (content.type) {
      case "post":
        return <BlogPost post={content} />;
      case "list":
        return <BlogList list={content} config={config} blog={params} />;
      default:
        return (
          <div style={{ whiteSpace: "pre" }}>
            {JSON.stringify(content, null, 2)}
          </div>
        );
    }
  })();

  return <div className="prose">{body}</div>;
};
