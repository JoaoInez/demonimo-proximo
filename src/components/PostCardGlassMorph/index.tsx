import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import Link from "next/link";
import styles from "./PostCardGlassMorph.module.scss";

interface IProps {
  post: PostOrPage;
}

const PostCardGlassMorph = ({ post }: IProps) => (
  <div className={styles.card}>
    <Link href={`/estorias/${post.slug}`}>
      <a className={styles.postContainer}>
        <div className={styles.postBody}>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
        <div className={styles.postImage}>
          <Image src={post.feature_image ?? ""} layout="fill" />
        </div>
      </a>
    </Link>
    <Link href={`/autores/${post.primary_author?.slug ?? ""}`}>
      <a className={styles.author}>
        <div>
          <Image src={post.primary_author?.profile_image ?? ""} layout="fill" />
        </div>
        <p>{post.primary_author?.name}</p>
      </a>
    </Link>
  </div>
);

export default PostCardGlassMorph;
