import React from "react";
import "./Credits.css";
import { useNavigate } from "react-router-dom";
const Credits = () => {
  const navigate = useNavigate();
  return (
    <div className="Outer3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg"
        viewBox="0 0 640 640"
        onClick={() => navigate("/")}
      >
        <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
      </svg>
      <div class="credits-container">
        <h1>Credits</h1>

        <h2>Created & Developed By</h2>

        <h3 class="creator-name">Harsh Vardhan Chaudhary</h3>
        <p class="creator-description">
          second-year Software Engineering student.
        </p>
        <a
          href="https://www.linkedin.com/in/harsh-vardhan-chaudhary-0b31b1367/"
          target="_blank"
          rel="noopener noreferrer"
          class="linkedin-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24px"
            height="24px"
            aria-hidden="true"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          Connect on LinkedIn
        </a>
        <h2>Powered By</h2>
        <ul class="tech-list">
          <li>React</li>
          <li>Node.js</li>
          <li>Socket.IO</li>
          <li>MongoDB</li>
          <li>Express</li>
        </ul>
      </div>
    </div>
  );
};

export default Credits;
