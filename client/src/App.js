import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "./Redux/Actions/actions";
import Home from "./Components/Home/Home";

function App() {
  const posts = useSelector((state) => state.posts);
  // const dispatch = useDispatch();
  // onClick={() => {dispatch(increment());}} //========= Change ==========//
  console.log(posts);
  return (
    <>
      <Home />
    </>
  );
}

export default App;
