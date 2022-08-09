import Author from "domain/authors/components/Author";
import { AuthorProps } from "domain/authors/components/Author/types";
import { getAuthor, getAuthorPosts, getAuthors } from "domain/common/api/ghost";
import { GetStaticProps } from "next";

const AuthorPage = (props: AuthorProps) => <Author {...props} />;

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
