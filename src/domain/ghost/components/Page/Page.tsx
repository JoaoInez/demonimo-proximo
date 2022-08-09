import { PageProps } from "./types";

const Page = ({ page }: PageProps) => (
  <div>
    <h1>{page.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: page.html ?? "" }} />
  </div>
);

export default Page;
