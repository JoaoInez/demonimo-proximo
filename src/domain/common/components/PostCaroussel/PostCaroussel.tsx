import Img from "domain/common/components/Img";
import styles from "./PostCaroussel.module.scss";
import { PostCarousselProps } from "./types";

const PostCaroussel = ({ posts }: PostCarousselProps) => {
  const post = posts[1];

  return (
    <article className={styles.container}>
      <Img src={post.feature_image || ""} className={styles.image} />
      <div className={styles.content}>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
};

export default PostCaroussel;
