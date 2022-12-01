import { BlogConfig } from "../config/type";
import { BlogPost } from "../post/post";
import { BlogParams } from "../type";
import { BlogListEntry } from "./entry";
import * as T from "./type";

interface Props {
  list: T.BlogList;
  config: BlogConfig;
  blog: BlogParams;
}

const Readme = (props: Props): JSX.Element | null => {
  const { list, config } = props;
  if (list.readme === null) return null;
  if (config.readme === "hide") return null;
  return <BlogPost post={list.readme} />;
};

const Entries = (props: Props): JSX.Element | null => {
  const { list, config, blog } = props;
  if (config.readme === "only" && list.readme !== null) return null;
  return (
    <ul>
      {list.entries
        .filter((e) => e.name.endsWith(".md") || e.type === "list")
        .map((e) => ({ ...e, name: e.name.replace(".md", "") }))
        .map((entry) => (
          <BlogListEntry key={entry.name} entry={entry} blog={blog} />
        ))}
    </ul>
  );
};

export const BlogList = (props: Props): JSX.Element => {
  return (
    <div>
      <Readme {...props} />
      <Entries {...props} />
    </div>
  );
};
