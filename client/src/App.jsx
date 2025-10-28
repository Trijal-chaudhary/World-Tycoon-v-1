import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/home/Home";
import LogIn from "../components/LogIn/LogIn";
import Lobby from "../components/lobby/Lobby";
import JoinGame from "../components/join Game/JoinGame";
import Game from "../components/game/Game";
import Result from "../components/game/LobbyAfterGame/Result";
import Theme from "../components/Theme/Theme";
import About from "../components/About/About";
import Credits from "../components/Credits/Credits";
import Help from "../components/Help/Help";
import Contacts from "../components/Contacts/Contacts";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/joinGame" element={<JoinGame />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result" element={<Result />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/about" element={<About />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contacts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
