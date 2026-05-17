import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Registered";
import Home from "./Components/Home";
import YourResumes from "./Components/YourResumes"; // Adjust path if needed
import Contact from "./Components/Contact"; // Import Contacts component
import ProtectedRoute from "./Components/ProtectedRoute"; // Ensure this is correctly implemented
import Navbar from "./Components/Navbar"; // Import Navbar
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar /> {/* Include Navbar in the layout */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/your-resumes"
          element={
            <ProtectedRoute>
              <YourResumes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;