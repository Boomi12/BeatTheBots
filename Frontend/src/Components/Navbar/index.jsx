import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "Your Resumes", path: "/your-resumes" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        ✦ BeatTheBots
      </div>

      {/* Center Links */}
      <div className="navbar-links">
        {links.map((link) => (
          <button
            key={link.path}
            className={`nav-link ${
              location.pathname === link.path ? "active" : ""
            }`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right Side Buttons */}
      <div className="navbar-actions">
        {!isLoggedIn ? (
          <>
            <button
              className="nav-btn-ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="nav-btn-primary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-btn-ghost"
              onClick={() => navigate("/your-resumes", { state: { openHistory: true, _t: Date.now() } })}
            >
              Resume History
            </button>

            <button
              className="nav-btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;