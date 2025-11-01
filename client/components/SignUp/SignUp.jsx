import { useRef, useState } from "react";
import "./SignUp.css";
import { addUserDetail } from "../../src/services/SignUp";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const [avtar, setAvtar] = useState(null);
  const Submit = async (e) => {
    if (!avtar) {
      alert("Select Avtar");
      return;
    }
    e.preventDefault();
    const userDetail = await addUserDetail(
      nameRef.current.value,
      userNameRef.current.value,
      passwordRef.current.value,
      avtar
    );
    navigate("/login");
  };
  const clickAvt = (id) => {
    setAvtar(id);
  };
  return (
    <>
      <div className="form-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svg"
          viewBox="0 0 640 640"
          onClick={() => navigate("/")}
        >
          <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
        </svg>
        <form className="signup-form" onSubmit={Submit}>
          <label>Choose Your Avatar:</label>
          <div className="avtarbox">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => (
              <div
                className={`avtarCard ${avtar === ele ? "active" : ""}`}
                onClick={() => clickAvt(ele)}
              >
                <img
                  src={`/assets/avtars/${ele}.jpg`}
                  alt={`avtar${ele}`}
                />
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            ref={nameRef}
          />
          <input
            type="text"
            placeholder="Enter User Name"
            required
            ref={userNameRef}
          />
          <input
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
export default SignUp;
