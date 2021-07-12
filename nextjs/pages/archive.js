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
