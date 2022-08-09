import Authors from "domain/authors/components/Authors";
import { AuthorsProps } from "domain/authors/components/Authors/types";
import { getAuthors } from "domain/common/api/ghost";

const AuthorsPage = (props: AuthorsProps) => <Authors {...props} />;

export const getStaticProps = async () => {
  const authors = await getAuthors();

  if (!authors.length) return { notFound: true };

  return {
    props: { authors },
  };
};

export default AuthorsPage;
