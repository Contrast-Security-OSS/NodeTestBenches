import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout, PostList } from '../components';
import { searchPostsByTitle } from '../data/posts';

const Blog = ({ searchTitle, posts }) => {
  const renderPosts = () => {
    if (!searchTitle) {
      return null;
    }

    return posts.length 
      ? <PostList posts={ posts } /> 
      : <p>No posts match the provided title...</p>;
  }

  return (
    <Layout>
      <section>
        <header>
          <h1>Blog</h1>
        </header>
        <main>
          <form action="#" method="GET">
            Search by <input type="text" name="title" placeholder="title" /> or go to the <Link href="/archive">archive</Link>.
          </form>
          { renderPosts() }
        </main>
      </section>
      <p>If you want, you can find more about me <Link href='/about'>here</Link></p>
    </Layout>
  );
};

const createGetServerSideProps = (searchFn) => {
  return async (context) => {
    const searchTitle = context?.query?.title;

    if (!searchTitle) {
      return { 
        props: {
          searchTitle: null,
          posts: []
        }
      };
    }

    const { posts } = await searchFn(searchTitle);

    return { 
      props: {
        searchTitle,
        posts
      }
    };
  };
};

export const getServerSideProps = createGetServerSideProps(searchPostsByTitle);

export default Blog;
