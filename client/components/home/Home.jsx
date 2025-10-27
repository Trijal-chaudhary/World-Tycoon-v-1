import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import {
  createGame,
  isuserLogged,
  logOutUser,
} from "../../src/services/SignUp";
function Home() {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentisals] = useState({
    isLoggedIn: false,
  });
  // let usercredentials;
  useEffect(() => {
    isuserLogged().then((res) => {
      // console.log(res);
      setUserCredentisals(res);
    });
  }, []);
  const logOutPlayer = async () => {
    await logOutUser();
    setUserCredentisals({
      isLoggedIn: false,
    });
  };
  const createTheGame = async () => {
    await createGame();
    navigate("/theme");
  };
  return (
    <div className="lobby-container">
      <img
        src="../../src/assets/logo.png"
        alt="World Tycoon Logo"
        className="lobby-logo"
      />

      <div className="user-auth-container">
        {!userCredentials.isLoggedIn ? (
          <>
            <button className="auth-button" onClick={() => navigate("/login")}>
              LogIn
            </button>
            <button className="auth-button" onClick={() => navigate("/signup")}>
              SignUp
            </button>
          </>
        ) : (
          <>
            <img
              src={`../../src/assets/avtars/${userCredentials.user.avtar}.jpg`}
              alt="avatar"
              className="profile-avatar"
            />
            <p className="profile-name">{userCredentials.user.name}</p>
          </>
        )}
      </div>

      <img
        src="../../src/assets/heroImage.png"
        alt="Planet Earth"
        className="hero-background-image"
      />

      <div className="text-container">
        <p className="welcome-text">
          {userCredentials.isLoggedIn ? (
            <>
              Welcome, <strong>{userCredentials.user.name}</strong> — step into
              the future of power, strategy, and global domination.
            </>
          ) : (
            <>
              New to the world? <strong>Sign up</strong> to forge your empire.
              Veterans, log in and continue your conquest.
            </>
          )}
        </p>
        <div className="action-buttons">
          {userCredentials.isLoggedIn ? (
            <>
              <button
                className="cta-button"
                onClick={() => navigate("/joinGame")}
              >
                Join Game
              </button>
              <button className="cta-button" onClick={createTheGame}>
                Create Game
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {!userCredentials.isLoggedIn ? (
        ""
      ) : (
        <button className="logout-button" onClick={logOutPlayer}>
          LogOut
        </button>
      )}
    </div>
  );
}

export default Home;
