import { PostsOrPages } from "@tryghost/content-api";
import { getAllPosts, getPosts, PAGE_LIMIT } from "api/ghost";
import { GetStaticProps } from "next";

interface IProps {
  posts: PostsOrPages;
  page: number;
  pagesCount: number;
}

const PageNumberPage = ({ posts, page, pagesCount }: IProps) => null;

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
