import { getBlogPage } from "./get";

export interface GithubPageProps {
  params: {
    segments: string[];
  };
}

const Page = async (props: GithubPageProps) => {
  const [owner, repo, ...pathSegments] = props.params.segments;
  const path = pathSegments.join("/");

  const page = await getBlogPage({ owner, repo, path });

  switch (page.content.type) {
    case "file":
      return <div dangerouslySetInnerHTML={{ __html: page.content.content }} />;
    default:
      return (
        <div style={{ whiteSpace: "pre" }}>
          {JSON.stringify(page.content, null, 2)}
        </div>
      );
  }
};

export default Page;

export const generateStaticParams = () => [];

export const revalidate = 60;
