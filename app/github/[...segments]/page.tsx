import { getBlogContent } from "#/lib/blog/content";

interface Props {
  params: {
    segments: string[];
  };
}

const Page = async (props: Props) => {
  const { params } = props;
  const data = await getBlogContent({
    owner: "thien-do",
    // repo: "algorithms-adventure",
    // path: "leetcode-problems/1046-last-stone-weight/README.md",
  });

  return (
    <div style={{ whiteSpace: "pre" }}>
      {JSON.stringify({ params, data }, null, 2)}
    </div>
  );
};

export default Page;

export const generateStaticParams = () => [];

export const revalidate = 60;
