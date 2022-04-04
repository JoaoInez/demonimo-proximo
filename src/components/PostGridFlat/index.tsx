import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import PostCardFlat from "components/PostCardFlat";
import styles from "./PostGridFlat.module.scss";

interface IProps {
  posts: PostsOrPages | PostOrPage[];
  large?: boolean;
}

const PostGridFlat = ({ posts, large = false }: IProps) => (
  <div className={`${styles.gridContainer} ${large ? styles.gridLarge : ""}`}>
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostCardFlat post={post} key={post.id} />
      ))}
    </div>
  </div>
);

export default PostGridFlat;
