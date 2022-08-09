import { getPosts, getSettings, getTags } from "domain/common/api/ghost";
import Home from "domain/home/components/Home/Home";
import { HomeProps } from "domain/home/components/Home/types";

const HomePage = (props: HomeProps) => <Home {...props} />;

export const getStaticProps = async () => {
  const settings = await getSettings();
  const tags = await getTags();
  const posts = await getPosts(undefined, 4);

  return {
    props: { settings, tags, posts },
  };
};

export default HomePage;
