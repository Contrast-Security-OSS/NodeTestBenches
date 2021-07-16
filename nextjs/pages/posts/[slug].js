/**
 * Exposes a statically built dynamic route page. Depends on external data to
 * build at build time a list of possible routes.
 */

import { Layout } from '../../components';
import { listPosts, getPostBySlug } from '../../data/posts';

const Post = ({ post }) => {
  return (
    <Layout>
      <h1>{ post.title }</h1>
      <main>
        { post.content }
      </main>
    </Layout>
  )
};

/**
 * A getStaticPaths factory. Receives a listing function as an argument.
 */
const createGetStaticPaths = (listFn) => {
  return async () => {
    const { posts } = await listFn();
    const paths = posts.map(post => ({  
      params: {
        slug: post.slug
      }
    }));

    return { paths, fallback: false };
  }
};

/**
 * A getStaticProps factory. Receives a function for getting a post by an
 * identifier.
 */
const createGetStaticProps = (getFn) => {
  return async ({ params }) => {
    const post = await getFn(params.slug);

    return { 
      props: {
        post
      }
    };
  };
};

export const getStaticPaths = createGetStaticPaths(listPosts);
export const getStaticProps = createGetStaticProps(getPostBySlug);

export default Post;