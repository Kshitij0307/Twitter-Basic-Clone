import axios from "axios";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";

const Register = () => {
  const nameElement = useRef();
  const emailElement = useRef();
  const passwordElement = useRef();
  const {url} = useOutletContext();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const name = nameElement.current.value;
    const email = emailElement.current.value;
    const password = passwordElement.current.value;

    const res = await axios.post(`${url}/register`,{name,email,password});
    
    console.log(res.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 ">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Register
        </label>
        <input
          type="text"
          ref={nameElement}
          className="form-control"
          id="name"
          placeholder="Enter your Name"
        />
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

export default Register;
