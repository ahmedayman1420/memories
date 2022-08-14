import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "./Redux/Actions/actions";
import Home from "./Components/Home/Home";

function App() {
  const posts = useSelector((state) => state.posts);
  console.log({posts})
  return (
    <>
      <Home />
    </>
  );
}

export default App;
