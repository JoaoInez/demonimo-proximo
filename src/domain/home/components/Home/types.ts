import { PostsOrPages, SettingsResponse, Tags } from "@tryghost/content-api";

export type HomeProps = {
  settings: SettingsResponse;
  tags: Tags;
  posts: PostsOrPages;
};
