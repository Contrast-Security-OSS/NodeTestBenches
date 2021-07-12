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