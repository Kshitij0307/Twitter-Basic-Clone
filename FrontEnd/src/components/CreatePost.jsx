import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
    const {postURL} = useOutletContext();
  const contentElement = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = contentElement.current.value;
    const response = await axios.post(`${postURL}/createPost`,{content}, {
        withCredentials: true, 
    });
    contentElement.current.value="";
    console.log(response.data);
  }
  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <label htmlFor="exampleFormControlTextarea1">What's in your mind?</label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        ref={contentElement}
      ></textarea>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default CreatePost;
