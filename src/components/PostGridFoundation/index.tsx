import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import PostCardFoundation from "components/PostCardFoundation";
import styles from "./PostGridFoundation.module.scss";

interface IProps {
  posts: PostsOrPages | PostOrPage[];
}

const PostGridFoundation = ({ posts }: IProps) => (
  <div className={styles.gridContainer}>
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostCardFoundation post={post} key={post.id} />
      ))}
    </div>
  </div>
);

export default PostGridFoundation;
