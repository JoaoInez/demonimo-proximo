import { Author, PostsOrPages } from "@tryghost/content-api";
import { getAuthor, getAuthorPosts, getAuthors } from "api/ghost";
import PostGridFoundation from "components/PostGridFoundation";
import { nanoid } from "nanoid";
import { GetStaticProps } from "next";
import Image from "next/image";
import styles from "styles/Author.module.scss";

interface IProps {
  author: Author;
  posts: PostsOrPages;
}

const AuthorPage = ({ author, posts }: IProps) => (
  <article className={styles.container}>
    <header className={styles.header}>
      {(author.name ?? "").split(" ").map((_name) => (
        <h1
          key={nanoid()}
          className={(author.cover_image ?? "") && styles.lightTitle}
        >
          {_name}
        </h1>
      ))}
      {author.cover_image && (
        <div className={styles.cover}>
          <Image src={author.cover_image} layout="fill" />
        </div>
      )}
      {author.profile_image && (
        <div
          className={
            author.cover_image ? styles.profileDark : styles.profileLight
          }
        >
          <Image src={author.profile_image} layout="fill" />
        </div>
      )}
    </header>
    <PostGridFoundation posts={posts} />
  </article>
);

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
