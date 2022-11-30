import { BlogParams } from "../type";
import { BlogPageProps } from "./type";

export const parseBlogPageParams = (props: BlogPageProps): BlogParams => {
  const [owner, _repo, ...pathSegments] = props.params.segments;
  const repo = _repo ?? owner; // Profile repo
  const path = pathSegments.join("/") ?? ""; // Root

  const params: BlogParams = { owner, repo, path };
  return params;
};
