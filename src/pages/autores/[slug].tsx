import { Author, PostsOrPages } from "@tryghost/content-api";
import { getAuthor, getAuthorPosts, getAuthors } from "api/ghost";
import { GetStaticProps } from "next";

interface IProps {
  author: Author;
  posts: PostsOrPages;
}

const AuthorPage = ({ author, posts }: IProps) => null;

export const getStaticPaths = async () => {
  const authors = await getAuthors();
  const paths = authors.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const author = await getAuthor((params?.slug ?? "") as string);
  const posts = await getAuthorPosts((params?.slug ?? "") as string);

  if (!author) return { notFound: true };

  return {
    props: { author, posts },
  };
};

export default AuthorPage;
