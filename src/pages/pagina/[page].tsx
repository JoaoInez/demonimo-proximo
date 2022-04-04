import { PostsOrPages } from "@tryghost/content-api";
import { getAllPosts, getPosts, PAGE_LIMIT } from "api/ghost";
import PaginationNeoMorph from "components/PaginationNeoMorph";
import PostGridFlat from "components/PostGridFlat";
import { GetStaticProps } from "next";
import styles from "styles/Pagina.module.scss";

interface IProps {
  posts: PostsOrPages;
  page: number;
  pagesCount: number;
}

const PageNumberPage = ({ posts, page, pagesCount }: IProps) => (
  <>
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h1>+Estórias.</h1>
      </div>
    </div>
    <PostGridFlat posts={posts} large={true} />
    <PaginationNeoMorph
      prev={page === 1 ? undefined : page !== 2 ? `/pagina/${page - 1}` : "/"}
      next={page < pagesCount ? `/pagina/${page + 1}` : undefined}
      page={page}
      pages={pagesCount}
    />
  </>
);

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
