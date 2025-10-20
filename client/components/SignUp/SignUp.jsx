import { useRef } from "react";
import "./SignUp.css";
import { addUserDetail } from "../../src/services/SignUp";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const userNameRef = useRef("");
  const passwordRef = useRef("");

  const Submit = async (e) => {
    e.preventDefault();
    const userDetail = await addUserDetail(
      nameRef.current.value,
      userNameRef.current.value,
      passwordRef.current.value
    );
    navigate("/login");
  };

  return (
    <>
      <div className="form-container">
        <form className="signup-form" onSubmit={Submit}>
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
