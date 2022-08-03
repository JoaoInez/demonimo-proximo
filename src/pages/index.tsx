import { PostsOrPages, SettingsResponse, Tags } from "@tryghost/content-api";
import { getPosts, getSettings, getTags } from "api/ghost";
import PostCaroussel from "components/PostCaroussel";
import styles from "styles/HomePage.module.scss";

interface IProps {
  settings: SettingsResponse;
  tags: Tags;
  posts: PostsOrPages;
}

const HomePage = ({ tags, posts }: IProps) => (
  <>
    <article className={styles.main}>
      <h1 className={styles.pageTitle}>Demónimo</h1>
      <div className={styles.ball} />
    </article>
    <article className={styles.categories}>
      <div className={styles.cloud} />
      {tags.map((tag) => (
        <div className={styles.category} key={tag.id}>
          <div>
            <p>{tag.name}</p>
          </div>
        </div>
      ))}
    </article>
    <PostCaroussel posts={posts} />
  </>
);

export const getStaticProps = async () => {
  const settings = await getSettings();
  const tags = await getTags();
  const posts = await getPosts(undefined, 4);

  return {
    props: { settings, tags, posts },
  };
};

export default HomePage;
