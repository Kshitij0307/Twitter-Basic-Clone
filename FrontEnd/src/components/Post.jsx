import axios from "axios";
import { useEffect, useState } from "react";

function Post({ post, fetchPosts, postURL }) {
  const [like, setLike] = useState("Like");
  const [likeCount, setLikeCount] = useState(0);

  
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`${postURL}/getLikes/${post._id}`, { withCredentials: true });
        setLikeCount(response.data.like);
        
        const userLiked = response.data.userLiked;
        setLike(userLiked ? "Unlike" : "Like");
      } catch (error) {
        console.error("Error fetching likes", error);
      }
    };
    fetchLikes();
  }, [post._id,]);

  
  const handleLike = async () => {
    try {
      const res = await axios.get(`${postURL}/like/${post._id}`, {
        withCredentials: true,
      });
      setLike(res.data.msg);
      setLikeCount(res.data.length);
    } catch (error) {
      console.error("Error liking/unliking post", error);
    }
  };

 
  const handleDelete = async () => {
    try {
      await axios.delete(`${postURL}/delete/${post._id}`, {
        withCredentials: true,
      });
      fetchPosts(); 
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div className="card gap" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{post.userEmail}</h5>
        <p className="card-text">{post.content}</p>
        <div className="like-dlt">
          <div className="like">
            <p className="likecount">{likeCount}</p>
            <button
              className={`btn ${like === "Like" ? "btn-primary" : "btn-danger"}`}
              onClick={handleLike}
            >
              {like}
            </button>
          </div>
          <a className="btn btn-danger" onClick={handleDelete}>
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default Post;
