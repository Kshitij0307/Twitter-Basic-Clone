import axios from "axios";
import { useOutletContext } from "react-router-dom";

const Logout = () => {
  const { userURL } = useOutletContext();

  const handleLogoutButton = async () => {
    const res = await axios.get(`${userURL}/logout`, { withCredentials: true });
    console.log(res);
  };
  return (
    <div>
      <div>Are you sure you want to logout? </div>
      <button type="button" className="btn btn-danger" onClick={handleLogoutButton}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
