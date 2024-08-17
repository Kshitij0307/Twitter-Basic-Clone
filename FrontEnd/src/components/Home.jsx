import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post';
import { useOutletContext } from 'react-router-dom';
import Noposts from './Noposts';

const Home = () => {
  const { postURL } = useOutletContext();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get(`${postURL}/getAllPosts`);
    setPosts(response.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {posts.length === 0 ? (
        <Noposts posts={posts} />
      ) : (
        posts.map((post) => (
          <Post post={post} fetchPosts={fetchPosts} key={post._id} postURL={postURL} />
        ))
      )}
    </>
  );
}

export default Home;
