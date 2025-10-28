import React from "react";
import "./Contacts.css";
import { useNavigate } from "react-router-dom";
const Contacts = () => {
  const navigate = useNavigate();
  return (
    <div className="Outer6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg"
        viewBox="0 0 640 640"
        onClick={() => navigate("/")}
      >
        <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
      </svg>
      <div class="contact-container">
        <h1 class="title">Contact Us</h1>

        <p>
          Have a question, feedback, or a business inquiry? We'd love to hear
          from you. Please reach out to the appropriate contact below.
        </p>

        <h2>General Support & Feedback</h2>
        <p>
          World Tycoon was designed, developed, and brought to life by
          <strong> Harsh Vardhan Chaudhary</strong>.
        </p>
        <p>
          Found a bug? Have a great idea for a new feature? Let us know! Your
          feedback is crucial for making World Tycoon the best game it can be.
        </p>
        <div class="contact-info">
          <a href="mailto:hvchaudhary86@gmail.com">hvchaudhary86@gmail.com</a>
        </div>

        <div class="back-button-container"></div>
      </div>
    </div>
  );
};

export default Contacts;
