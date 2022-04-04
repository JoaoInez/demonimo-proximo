import Link from "next/link";
import styles from "./PaginationNeoMorph.module.scss";

interface IProps {
  prev?: string;
  next?: string;
  page: number;
  pages: number;
}

const PaginationNeoMorph = ({ prev, next, page, pages }: IProps) => (
  <div className={styles.pagination}>
    <div className={styles.paginationContainer}>
      {prev ? (
        <Link href={prev}>
          <a>
            <button className={styles.leftBtn}>
              <span>&#10141;</span>
            </button>
          </a>
        </Link>
      ) : (
        <div></div>
      )}
      <p>{page / pages}</p>
      {next ? (
        <Link href={next}>
          <a>
            <button>
              <span>&#10141;</span>
            </button>
          </a>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  </div>
);

export default PaginationNeoMorph;
