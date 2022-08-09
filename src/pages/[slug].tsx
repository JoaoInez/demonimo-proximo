import { getAllPages, getPage } from "domain/common/api/ghost";
import Page from "domain/ghost/components/Page";
import { PageProps } from "domain/ghost/components/Page/types";
import { GetStaticProps } from "next";

const GhostPage = (props: PageProps) => <Page {...props} />;

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
