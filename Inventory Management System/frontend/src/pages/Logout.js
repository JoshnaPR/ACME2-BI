import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all data from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
