import { Authors } from "@tryghost/content-api";
import { getAuthors } from "api/ghost";
import Link from "next/link";

interface IProps {
  authors: Authors;
}

const AuthorsPage = ({ authors }: IProps) => (
  <ul>
    {authors.map(author => (
      <li key={author.id}>
        <Link href={`/autores/${author.slug}`}>
          <a>{author.name}</a>
        </Link>
      </li>
    ))}
  </ul>
);

export const getStaticProps = async () => {
  const authors = await getAuthors();

  if (!authors.length) return { notFound: true };

  return {
    props: { authors },
  };
};

export default AuthorsPage;
