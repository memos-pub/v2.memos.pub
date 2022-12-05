const description = [
  "Memos.pub makes a blog out of markdown files on public GitHub repo.",
  "No sign-in or sign-up required.",
].join(" ");

const AppHead = (): JSX.Element => {
  return (
    <>
      <title>Memos.pub</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={description} />
    </>
  );
};

export default AppHead;
