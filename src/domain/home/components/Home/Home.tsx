import PostCaroussel from "domain/common/components/PostCaroussel";
import styles from "./Home.module.scss";
import { HomeProps } from "./types";

const Home = ({ tags, posts }: HomeProps) => (
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

export default Home;
