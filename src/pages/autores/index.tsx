import { Authors } from "@tryghost/content-api";
import { getAuthors } from "api/ghost";

interface IProps {
  authors: Authors;
}

const AuthorsPage = ({ authors }: IProps) => null;

export const getStaticProps = async () => {
  const authors = await getAuthors();

  if (!authors.length) return { notFound: true };

  return {
    props: { authors },
  };
};

export default AuthorsPage;
