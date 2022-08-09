import { getAllPosts, getPost, getRelatedPosts } from "domain/common/api/ghost";
import Story from "domain/stories/components/Story";
import { StoryProps } from "domain/stories/components/Story/types";
import { GetStaticProps } from "next";

const StoryPage = (props: StoryProps) => <Story {...props} />;

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost((params?.slug ?? "") as string);
  const relatedPosts = await getRelatedPosts(
    post.id,
    post.primary_tag?.slug ?? ""
  );

  if (!post) return { notFound: true };

  return {
    props: { post, relatedPosts },
  };
};

export default StoryPage;
