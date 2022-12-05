import "rehype-meta";
import rehypeTitle, {
  Options as RehypeTitleOptions,
} from "rehype-infer-title-meta";
import rehypeDescription from "rehype-infer-description-meta";
import { PluggableList } from "unified";

const rehypeTitleOptions: RehypeTitleOptions = {
  selector: "h1,h2,h3",
};

export const markdownMeta: PluggableList = [
  rehypeDescription,
  [rehypeTitle, rehypeTitleOptions],
];
