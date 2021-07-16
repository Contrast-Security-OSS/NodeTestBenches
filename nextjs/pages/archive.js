/**
 * Exposes a statically built page. Depends on external data to
 * build at build time a list of posts.
 */

import { Layout, PostList } from '../components';
import { listPosts } from '../data/posts';

const Archive = ({ posts }) => {
  return (
    <Layout>
      <section>
        <header>
          <h1>Archive</h1>
        </header>
        <main>
          <PostList posts={ posts } />
        </main>
      </section>
    </Layout>
  );
};

/**
 * A getStaticProps factory. Receives a listing function as an argument.
 */
const createGetStaticProps = (listFn) => {
  return async () => {
    const { posts } = await listFn();

    return { 
      props: {
        posts
      }
    };
  };
};

export const getStaticProps = createGetStaticProps(listPosts);

export default Archive;
