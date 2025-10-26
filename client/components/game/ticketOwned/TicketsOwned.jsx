import React from "react";
import "./TicketsOwned.css";
const TicketsOwned = ({ tickets, ownedTicketClick }) => {
  return (
    <div className="TicketsCount">
      <div className="redTickets oreantation">
        {tickets?.red?.map((tic) => (
          <>
            <div
              className="purcheadTick red"
              onClick={() => ownedTicketClick(tic.id)}
            >
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
      <div className="blueTickets oreantation">
        {tickets?.blue?.map((tic) => (
          <>
            <div
              className="purcheadTick blue"
              onClick={() => ownedTicketClick(tic.id)}
            >
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
      <div className="yellowTickets oreantation">
        {tickets?.yellow?.map((tic) => (
          <>
            <div
              className="purcheadTick yellow"
              onClick={() => ownedTicketClick(tic.id)}
            >
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
      <div className="greenTickets oreantation">
        {tickets?.green?.map((tic) => (
          <>
            <div
              className="purcheadTick green"
              onClick={() => ownedTicketClick(tic.id)}
            >
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
      <div className="grayTickets">
        {tickets?.gray?.map((tic) => (
          <>
            <div className="purcheadTick gray">
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default TicketsOwned;
