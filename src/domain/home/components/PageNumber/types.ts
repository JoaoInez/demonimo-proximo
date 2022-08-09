import { PostsOrPages } from "@tryghost/content-api";

export type PageNumberProps = {
  posts: PostsOrPages;
  page: number;
  pagesCount: number;
};
