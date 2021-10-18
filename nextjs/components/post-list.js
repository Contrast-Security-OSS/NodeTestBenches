import Link from 'next/link';

const getPostHref = ({ slug }) => `/posts/${slug}`;

export const Post = ({ post }) => (
  <article>
    <header>
      <h2>
        <Link href={ getPostHref(post) }>{ post.title }</Link>
      </h2>
    </header>
  </article>
);

export const PostList = ({ posts }) => (
  <li>
    { posts.map(post => <Post key={ post.slug } post={ post } />) }
  </li>
);