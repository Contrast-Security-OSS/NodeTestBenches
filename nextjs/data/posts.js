const posts = [{
  slug: 'first-post',
  title: 'My first post!',
  content: 'Contents'
}];

export const listPosts = async () => ({
  posts
});

export const getPostBySlug = async (slug) => posts.find(post => post.slug === slug);

export const searchPostsByTitle = async (title) => {
  const foundPosts = posts.filter(post => {
    const normalizedTitle = post.title.toLowerCase();
    const normalizedSearchParam = title.toLowerCase();

    return normalizedTitle.indexOf(normalizedSearchParam) >= 0;
  });

  return { posts: foundPosts }
};