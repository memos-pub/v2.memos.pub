import { getBlogPage } from "#/lib/blog/page";
import { runMdx } from "#/lib/md/run";

export interface GithubPageProps {
  params: {
    segments: string[];
  };
}

const Page = async (props: GithubPageProps) => {
  const [owner, repo, ...pathSegments] = props.params.segments;
  const path = pathSegments.join("/");

  const page = await getBlogPage({ owner, repo, path });
  const { content } = page;
  if (content.type === "file") {
    return (
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: content.content,
        }}
      />
    );
  }
  return (
    <div style={{ whiteSpace: "pre" }}>
      {JSON.stringify(page.content, null, 2)}
    </div>
  );
};

export default Page;

export const generateStaticParams = () => [];

export const revalidate = 60;
