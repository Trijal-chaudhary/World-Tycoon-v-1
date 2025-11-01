import React, { useEffect, useState } from "react";
import "./Theme.css";
import { theme, themeNext } from "../../src/services/SignUp";
import { useNavigate } from "react-router-dom";
const Theme = () => {
  const navigate = useNavigate();
  const [themeDetalis, setTheme] = useState();
  const [selectTheme, setSelectTheme] = useState();
  useEffect(() => {
    theme().then((theme2) => {
      setTheme(theme2.themes[0]);
    });
  }, []);
  const selection = (data) => {
    setSelectTheme(data);
  };
  const next = async (th) => {
    await themeNext(th);
    navigate("/lobby");
  };
  return (
    <div class="theme-select-container">
      {/* <button onClick={click}>Fetch</button> */}
      <h1 class="theme-heading">Select The Theme</h1>
      <div className="themecont">
        {themeDetalis
          ? Object.keys(themeDetalis).map((ele) => (
              <>
                {ele !== "_id" ? (
                  <div
                    className={`Theme ${selectTheme === ele ? "active1" : ""}`}
                    onClick={() => selection(ele)}
                  >
                    <img src={`../../src/assets/${ele}.jpg`} alt="" />
                    <h2>{ele}</h2>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))
          : ""}
      </div>
      {selectTheme ? (
        <button className="Start" onClick={() => next(selectTheme)}>
          NEXT
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Theme;
