import { parseBlogPageParams } from "./parse";
import { BlogPageProps } from "./type";

export const BlogPageHead = (props: BlogPageProps): JSX.Element => {
  const { owner } = parseBlogPageParams(props);

  return (
    <>
      <link
        rel="icon"
        href={`//f.viole.in/api/favicon?user=${owner}&size=48`}
      />
    </>
  );
};
