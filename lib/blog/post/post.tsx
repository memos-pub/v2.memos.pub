import * as T from "./type";

interface Props {
  post: T.BlogPost;
}

export const BlogPost = (props: Props): JSX.Element => {
  const { post } = props;
  return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
};
