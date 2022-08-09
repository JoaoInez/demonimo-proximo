import GhostContentAPI, {
  Author,
  Authors,
  PostOrPage,
  PostsOrPages,
  SettingsResponse,
  Tags,
} from "@tryghost/content-api";

export const PAGE_LIMIT = 5;

export const api = new GhostContentAPI({
  url: "https://admin.demonimo.pt",
  key: "1e7b9528aa18f68fad00be1b91",
  version: "v3",
});

export const getSettings = async () =>
  await api.settings.browse().catch(() => null as unknown as SettingsResponse);

export const getAllPosts = async () =>
  await api.posts
    .browse({ limit: "all" })
    .catch(() => [] as unknown as PostsOrPages);

export const getPosts = async (page = 1, limit = PAGE_LIMIT) =>
  await api.posts
    .browse({ page, limit, include: ["authors", "tags"] })
    .catch(() => [] as unknown as PostsOrPages);

export const getAuthorPosts = async (authorSlug: string) =>
  await api.posts
    .browse({
      filter: `primary_author:${authorSlug}`,
      include: "tags",
    })
    .catch(() => [] as unknown as PostsOrPages);

export const getRelatedPosts = async (postId: string, postTag: string) =>
  await api.posts
    .browse({
      limit: 2,
      filter: `id:-${postId}+tag:${postTag}`,
      include: ["authors", "tags"],
    })
    .catch(() => null as unknown as PostOrPage);

export const getPost = async (postSlug: string) =>
  await api.posts
    .read(
      {
        slug: postSlug,
      },
      { include: ["authors", "tags"] }
    )
    .catch(() => null as unknown as PostOrPage);

export const getAllPages = async () =>
  await api.pages.browse().catch(() => [] as unknown as PostsOrPages);

export const getPage = async (pageSlug: string) =>
  await api.pages
    .read({
      slug: pageSlug,
    })
    .catch(() => null as unknown as PostOrPage);

export const getAuthors = async () =>
  await api.authors.browse().catch(() => [] as unknown as Authors);

export const getAuthor = async (authorSlug: string) =>
  await api.authors
    .read(
      {
        slug: authorSlug,
      },
      { include: "count.posts" }
    )
    .catch(() => null as unknown as Author);

export const getTags = async () =>
  await api.tags.browse().catch(() => [] as unknown as Tags);
