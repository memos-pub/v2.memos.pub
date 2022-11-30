import { PageProps } from "./page";

const getFavicon = (props: PageProps): string => {
  const [owner] = props.params.segments;
	return `https://funcs.dev/api/favicon?user=${owner}&size=48`;
};

export default function Head(props: PageProps) {
  return (
    <>
      <link rel="icon" href={getFavicon(props)} />
    </>
  )
}
