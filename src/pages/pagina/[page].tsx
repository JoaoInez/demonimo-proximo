import { getAllPosts, getPosts, PAGE_LIMIT } from "domain/common/api/ghost";
import PageNumber from "domain/home/components/PageNumber";
import { PageNumberProps } from "domain/home/components/PageNumber/types";
import { GetStaticProps } from "next";

const PageNumberPage = (props: PageNumberProps) => <PageNumber {...props} />;

export const getStaticPaths = async () => {
  const pages = Math.ceil((await getAllPosts()).length / PAGE_LIMIT);
  const paths = [...Array(pages)].map((_, i) => ({
    params: { page: `${i + 1}` },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPosts(+(params?.page ?? ""));
  const pagesCount = Math.ceil((await getAllPosts()).length / PAGE_LIMIT);

  if (!posts.length) return { notFound: true };

  return {
    props: { posts, page: +(params?.page ?? ""), pagesCount },
  };
};

export default PageNumberPage;
