import React from "react";
import "./Owned.css";
const Owned = ({ data, OK }) => {
  return (
    <div className="royal-modal">
      <div className="modal-content">
        <p>{data}</p>
      </div>
      <div className="modal-actions">
        <button className="royal-btn" onClick={OK}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Owned;
