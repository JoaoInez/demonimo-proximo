import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import Img from "../ui/Img";
import styles from "./PostCardFoundation.module.scss";

interface IProps {
  post: PostOrPage;
}

const PostCardFoundation = ({ post }: IProps) => (
  <div className={styles.card}>
    <Link href={`/estorias/${post.slug}`}>
      <a>
        <Img src={post.feature_image ?? ""} className={styles.postImage} />
      </a>
    </Link>
    <div className={styles.body}>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
    </div>
  </div>
);

export default PostCardFoundation;
