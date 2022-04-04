import { PostsOrPages, SettingsResponse } from "@tryghost/content-api";
import { getAllPosts, getPosts, getSettings, PAGE_LIMIT } from "api/ghost";
import PaginationNeoMorph from "components/PaginationNeoMorph";
import PostGridFlat from "components/PostGridFlat";
import Img from "components/ui/Img";
import Head from "next/head";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import howLongSince from "utils/howLongSince";

interface IProps {
  posts: PostsOrPages;
  settings: SettingsResponse;
  pagesCount: number;
}

const HomePage = ({ posts, settings, pagesCount }: IProps) => {
  const [mostRecentPost, ...restPosts] = posts;

  return (
    <>
      <Head>
        <title>{settings.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hero}>
        <h1>{settings.title}</h1>
        <div className={styles.ball}></div>
      </div>
      <div className={styles.featured}>
        <div className={styles.imageContainer}>
          <Link href={`/estorias/${mostRecentPost.slug}`}>
            <a className={styles.featuredImage}>
              <Img src={`${mostRecentPost.feature_image}`} />
            </a>
          </Link>
        </div>
        <div className={styles.postContainer}>
          <div className={styles.gradient}></div>
          <Link href={`/estorias/${mostRecentPost.slug}`}>
            <a className={styles.title}>
              <h1>{mostRecentPost.title}</h1>
            </a>
          </Link>
          <Link href={`/autores/${mostRecentPost.primary_author?.slug ?? ""}`}>
            <a className={styles.author}>
              <Img src={mostRecentPost.primary_author?.profile_image ?? ""} />
              <p>{mostRecentPost.primary_author?.name}</p>
            </a>
          </Link>
          <p className={styles.posted}>
            (há {howLongSince(mostRecentPost?.published_at ?? "")})
          </p>
        </div>
      </div>
      <PostGridFlat posts={restPosts} />
      <PaginationNeoMorph next={`/pagina/2`} page={1} pages={pagesCount} />
    </>
  );
};

export const getStaticProps = async () => {
  const settings = await getSettings();
  const posts = await getPosts(undefined, 5);
  const pagesCount = Math.ceil((await getAllPosts()).length / PAGE_LIMIT);

  if (!posts.length) return { notFound: true };

  return {
    props: { settings, posts, pagesCount },
  };
};

export default HomePage;
