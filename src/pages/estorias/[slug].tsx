import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import { getAllPosts, getPost, getRelatedPosts } from "api/ghost";
import PostCardGlassMorph from "components/PostCardGlassMorph";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/Estoria.module.scss";
interface IProps {
  post: PostOrPage;
  relatedPosts: PostsOrPages;
}

const PostPage = ({ post, relatedPosts }: IProps) => (
  <>
    <Head>
      {post.codeinjection_head && (
        <style type="text/css">
          {`${post.codeinjection_head.replace(/<.*style.*>/g, "")}`}
        </style>
      )}
      {post.codeinjection_foot && (
        <script async>
          {`${post.codeinjection_foot.replace(/<.*script.*>/g, "")}`}
        </script>
      )}
    </Head>
    <div className={styles.imageContainer}>
      <Image src={post.feature_image ?? ""} layout="fill" />
    </div>
    <article className={`${styles.postContainer} post-container`}>
      <div className={styles.postBody}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html ?? "" }} />
      </div>
    </article>
    <article className={styles.authorContainer}>
      <div className={styles.authorBody}>
        <h2>Autor(x)</h2>
        <hr />
        <div>
          <Link href={`/autores/${post.primary_author?.slug ?? ""}`}>
            <a className={styles.avatarContainer}>
              <div>
                <Image
                  src={post.primary_author?.profile_image ?? ""}
                  layout="fill"
                />
              </div>
              <h1>{post.primary_author?.name}</h1>
            </a>
          </Link>
          <div className={styles.bioContainer}>
            <h2>{post.primary_author?.bio}</h2>
          </div>
        </div>
      </div>
    </article>
    <article className={styles.relatedPosts}>
      <div className={styles.wave}>
        <div>
          <Image src="/wave.svg" layout="fill" />
        </div>
      </div>
      {relatedPosts.map((relatedPost) => (
        <PostCardGlassMorph post={relatedPost} />
      ))}
    </article>
  </>
);

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost((params?.slug ?? "") as string);
  const relatedPosts = await getRelatedPosts(
    post.id,
    post.primary_tag?.slug ?? ""
  );

  if (!post) return { notFound: true };

  return {
    props: { post, relatedPosts },
  };
};

export default PostPage;
