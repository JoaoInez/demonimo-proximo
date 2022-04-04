import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import Link from "next/link";
import styles from "./PostCardFlat.module.scss";

interface IProps {
  post: PostOrPage;
}

const PostCardFlat = ({ post }: IProps) => (
  <div className={styles.card}>
    <Link href={`/estorias/${post.slug}`}>
      <a className={styles.postImage}>
        <Image
          src={post.feature_image ?? ""}
          layout="fill"
          alt="Picture of the author"
        />
      </a>
    </Link>
    <Link href={`/estorias/${post.slug}`}>
      <a className={styles.postTitle}>
        <h4>{post.title}</h4>
      </a>
    </Link>
    <Link href={`/autores/${post.primary_author?.slug ?? ""}`}>
      <a className={styles.author}>
        <p>{post.primary_author?.name ?? ""}</p>
      </a>
    </Link>
  </div>
);

export default PostCardFlat;
