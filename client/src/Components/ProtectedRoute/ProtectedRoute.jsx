import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = () => {
  const memoryProfile = JSON.parse(localStorage.getItem("memoryProfile"));
  let auth = false;
  try {
    var decoded = jwt_decode(memoryProfile.token);
    auth = true;
  } catch (error) {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
