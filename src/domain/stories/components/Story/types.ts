import { PostOrPage, PostsOrPages } from "@tryghost/content-api";

export type StoryProps = {
  post: PostOrPage;
  relatedPosts: PostsOrPages;
};
