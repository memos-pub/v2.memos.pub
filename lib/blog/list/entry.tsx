import { BlogParams } from "../type";
import * as T from "./type";

interface Props {
  blog: BlogParams;
  entry: T.BlogListEntry;
}

/*
- custom: /<partial path>/<entry>
- sub:    /<repo>/<path>/<entry>
- local:  /github/<owner>/<repo>/<path>/<entry>
*/

export const BlogListEntry = (props: Props): JSX.Element => {
  const { entry, blog } = props;

  return (
    <li className={entry.type === "list" ? "list-[disclosure-closed]" : ""}>
      <a href={`./${entry.name}`}>{entry.name}</a>
    </li>
  );
};
