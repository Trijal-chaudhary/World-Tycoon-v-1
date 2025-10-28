import React from "react";
import "./TicketInfo.css";
const Bye = ({ ticketInfo, Buy, Cut }) => {
  return (
    <div className="property-card">
      <button className="btn-close" onClick={Cut}>
        X
      </button>

      <div className={`card-header ${ticketInfo?.Color}-style`}>
        <h2>{ticketInfo?.Name}</h2>
        <h2>${ticketInfo?.price}</h2>
      </div>

      <div className="card-body">
        <p>
          Rent: <span>${ticketInfo?.rent}</span>
        </p>
        {ticketInfo?.house?.["1House"] ? (
          <>
            {ticketInfo?.house?.["Site"] ? (
              <p>
                Site Only: <span>${ticketInfo?.house["Site"]}</span>
              </p>
            ) : (
              ""
            )}
            <p>
              1 House: <span>${ticketInfo?.house["1House"]}</span>
            </p>
            <p>
              2 House: <span>${ticketInfo?.house["2House"]}</span>
            </p>
            <p>
              3 House: <span>${ticketInfo?.house["3House"]}</span>
            </p>
            <p>
              Hotel: <span>${ticketInfo?.house["Hotel"]}</span>
            </p>
          </>
        ) : (
          ""
        )}
        {ticketInfo?.Color == "gray" ? (
          <>
            <p>
              Matching: <span>{ticketInfo?.matching}</span>
            </p>
            <p>
              Match : <span>x2 rent!</span>
            </p>
          </>
        ) : (
          ""
        )}
        <p>
          Owner: <span>{ticketInfo?.owner}</span>
        </p>
      </div>
    </div>
  );
};

export default Bye;
