import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all data from localStorage
    localStorage.clear();

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
