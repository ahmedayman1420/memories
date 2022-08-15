import "./App.css";
// import { useSelector, useDispatch } from "react-redux";
import Home from "./Components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./Components/Authentication/Authentication";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function App() {
  // const posts = useSelector((state) => state.posts);
  // console.log({ posts });
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
        </Route>

        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </>
  );
}

export default App;
