import { getBlogPage } from "#/lib/blog/page";

export interface GithubPageProps {
  params: {
    segments: string[];
  };
}

const Page = async (props: GithubPageProps) => {
  const [owner, repo, ...pathSegments] = props.params.segments;
  const path = pathSegments.join("/");

  const page = await getBlogPage({ owner, repo, path });

  return (
    <div style={{ whiteSpace: "pre" }}>{JSON.stringify({ page }, null, 2)}</div>
  );
};

export default Page;

export const generateStaticParams = () => [];

export const revalidate = 60;
