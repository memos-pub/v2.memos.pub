import { BlogParams } from "../type";
import { BlogPageProps } from "./type";

export const parseBlogPageParams = (props: BlogPageProps): BlogParams => {
  const [owner, repo, ...pathSegments] = props.params.segments;
  const path = pathSegments.join("/") ?? ""; // Root
  const params: BlogParams = { owner, repo, path };
  return params;
};
