import { Outlet } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./Register";

const url = 'http://localhost:8000/api/users'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Outlet context={{url}}></Outlet>
      </Container>
    </>
  );
}

export default App;
