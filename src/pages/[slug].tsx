import { PostOrPage } from "@tryghost/content-api";
import { getAllPages, getPage } from "api/ghost";
import { GetStaticProps } from "next";

interface IProps {
  page: PostOrPage;
}

const GhostPage = ({ page }: IProps) => (
  <div>
    <h1>{page.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: page.html ?? "" }} />
  </div>
);

export const getStaticPaths = async () => {
  const pages = await getAllPages();
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = await getPage((params?.slug ?? "") as string);

  if (!page) return { notFound: true };

  return {
    props: { page },
  };
};

export default GhostPage;
