import { useRef } from "react";
import axios from 'axios';
import { useOutletContext } from "react-router-dom";

const Login = () => {
  const emailElement = useRef();
  const passwordElement = useRef();
  const {url} = useOutletContext();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const email = emailElement.current.value;
    const password = passwordElement.current.value;
    

    const res = await axios.post(`${url}/login`,{email,password}, { withCredentials: true });
    console.log(res.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 ">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Login
        </label>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="email"
            ref={emailElement}
            className="form-control"
            placeholder="Email"
            aria-label="Email"
          />
        </div>
        <div className="col">
          <input
            type="password"
            ref={passwordElement}
            className="form-control"
            placeholder="Password"
            aria-label="Password"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
