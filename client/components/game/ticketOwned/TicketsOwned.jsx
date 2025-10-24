import React from "react";
import "./TicketsOwned.css";
const TicketsOwned = ({ tickets }) => {
  return (
    <div className="TicketsCount">
      <div className="redTickets oreantation">
        {tickets?.red?.map((tic) => (
          <>
            <div className="purcheadTick red">
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
      <div className="blueTickets oreantation">
        {tickets?.blue?.map((tic) => (
          <>
            <div className="purcheadTick blue">
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
      <div className="yellowTickets oreantation">
        {tickets?.yellow?.map((tic) => (
          <>
            <div className="purcheadTick yellow">
              <h4>{tic?.Name}</h4>
              <h5>${tic?.rent}</h5>
            </div>
          </>
        ))}
      </div>
      <div className="greenTickets oreantation">
        {tickets?.green?.map((tic) => (
          <>
            <div className="purcheadTick green">
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
