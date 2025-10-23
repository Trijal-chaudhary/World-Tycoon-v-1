import React from "react";
import "./Owned.css";
const Owned = ({ data, OK }) => {
  return (
    <div className="royal-modal">
      <div className="modal-content">
        <p>
          Ticket has been purchased by {data?.owner}. ${data?.rent} has been
          deducted from your money.
        </p>
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
