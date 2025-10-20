import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/home/Home";
import LogIn from "../components/LogIn/LogIn";
import Lobby from "../components/lobby/Lobby";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
