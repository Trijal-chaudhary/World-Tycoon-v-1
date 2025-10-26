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
        <form className="signup-form" onSubmit={Submit}>
          <label>Choose Your Avatar:</label>
          <div className="avtarbox">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => (
              <div
                className={`avtarCard ${avtar === ele ? "active" : ""}`}
                onClick={() => clickAvt(ele)}
              >
                <img
                  src={`../../src/assets/avtars/${ele}.jpg`}
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
