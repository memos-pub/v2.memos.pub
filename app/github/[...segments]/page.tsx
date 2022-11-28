import { getGHContents } from "#/lib/github/contents";

interface Props {
  params: {
    segments: string[];
  };
}

const Page = async (props: Props) => {
  const { params } = props;
  const content = await getGHContents({
    owner: "monodyle",
    repo: "algorithms-adventure",
    path: "leetcode-problems/1046-last-stone-weight/README.md",
  });
  return (
    <div style={{ whiteSpace: "pre" }}>
      {JSON.stringify({ params, content }, null, 2)}
    </div>
  );
};

export default Page;

export const generateStaticParams = () => [];

export const revalidate = 60;
