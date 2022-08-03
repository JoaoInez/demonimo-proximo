import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import { getAllPosts, getPost, getRelatedPosts } from "api/ghost";
import { GetStaticProps } from "next";
interface IProps {
  post: PostOrPage;
  relatedPosts: PostsOrPages;
}

const PostPage = ({ post, relatedPosts }: IProps) => null;

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

export default PostPage;
