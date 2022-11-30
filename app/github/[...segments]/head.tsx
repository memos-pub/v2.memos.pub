import { GithubPageProps } from "./page";

const Head = (props: GithubPageProps): JSX.Element => {
  const [owner] = props.params.segments;
  return (
    <>
      <link
        rel="icon"
        href={`//f.viole.in/api/favicon?user=${owner}&size=48`}
      />
    </>
  );
};

export default Head;
