export interface BlogPost {
  type: "post";
  html: string;
  meta: {
    description: string;
    title: string;
  };
}
