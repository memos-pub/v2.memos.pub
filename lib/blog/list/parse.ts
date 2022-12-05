import { components } from "@octokit/openapi-types";
import { BlogList, BlogListEntry } from "./type";

type Raw = components["schemas"]["content-directory"];

type RawEntry = Raw[number];

const toEntry = (raw: RawEntry): BlogListEntry | null => {
  const { type, name } = raw;
  switch (type) {
    case "dir":
      return { type: "list", name };
    case "file":
      return { type: "post", name };
    default:
      return null;
  }
};

export const parseBlogList = async (raw: Raw): Promise<BlogList> => {
  const entries: BlogListEntry[] = raw
    .map(toEntry)
    .filter((e): e is BlogListEntry => e !== null);

  // Readme is provided later
  const list: BlogList = { type: "list", entries, readme: null };
  return list;
};
