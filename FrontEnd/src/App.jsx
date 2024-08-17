import { Outlet } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import Navbar from "./components/Navbar";

const userURL = "http://localhost:8000/api/users";
const postURL = "http://localhost:8000/api/posts";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Outlet context={{ userURL, postURL }}></Outlet>
      </Container>
    </>
  );
}

export default App;
