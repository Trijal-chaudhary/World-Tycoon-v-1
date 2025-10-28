import React, { useEffect, useState } from "react";
import "./lobbyAfterGame.css";
import { DeleteLobby, result } from "../../../src/services/SignUp";
import { useNavigate } from "react-router-dom";
const Result = () => {
  const [res, setRes] = useState();
  const [lobby, setLobby] = useState();
  useEffect(() => {
    result().then((data) => {
      console.log(data.sort);
      setRes(data.sort);
      setLobby(data.lobby);
    });
  }, []);
  const deleteGame = async () => {
    await DeleteLobby();
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    <div className="mainco">
      <div class="rank-container">
        <div class="rank-header">
          <div>Rank</div>
          <div>Player & Title</div>
          <div>Money</div>
        </div>

        <div class="player-rank-row rank-1">
          <div class="rank-icon">🥇</div>
          <div class="player-info">
            {res?.[0][1]?.id === lobby?.host?._id ? (
              <span className="player-name">{lobby?.host?.name}</span>
            ) : (
              lobby?.players?.map((ele) =>
                res?.[0][1]?.id === ele?._id ? (
                  <span key={ele._id} className="player-name">
                    {ele?.name}
                  </span>
                ) : null
              )
            )}

            <span class="player-title">Cash King</span>
            <span class="player-description">
              Rules the economy — the richest and most powerful player.
            </span>
          </div>
          <div class="player-money">${res?.[0][1]?.money}</div>
        </div>
        {res?.[1] ? (
          <>
            {res?.[2] ? (
              <div class="player-rank-row rank-2">
                <div class="rank-icon">🥈</div>
                <div class="player-info">
                  {res?.[1][1]?.id === lobby?.host?._id ? (
                    <span className="player-name">{lobby?.host?.name}</span>
                  ) : (
                    lobby?.players?.map((ele) =>
                      res?.[1][1]?.id === ele?._id ? (
                        <span key={ele._id} className="player-name">
                          {ele?.name}
                        </span>
                      ) : null
                    )
                  )}
                  <span class="player-title">Silver Tycoon</span>
                  <span class="player-description">
                    Almost at the top, but still chasing the throne.
                  </span>
                </div>
                <div class="player-money">${res?.[1][1]?.money}</div>
              </div>
            ) : (
              <div class="player-rank-row rank-4">
                <div class="rank-icon">💀</div>
                <div class="player-info">
                  {res?.[1][1]?.id === lobby?.host?._id ? (
                    <span className="player-name">{lobby?.host?.name}</span>
                  ) : (
                    lobby?.players?.map((ele) =>
                      res?.[1][1]?.id === ele?._id ? (
                        <span key={ele._id} className="player-name">
                          {ele?.name}
                        </span>
                      ) : null
                    )
                  )}
                  <span class="player-title">Broke Broker</span>
                  <span class="player-description">
                    Tried the market… but ended up bankrupt.
                  </span>
                </div>
                <div class="player-money">${res?.[1][1]?.money}</div>
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {res?.[2] ? (
          <>
            {res?.[3] ? (
              <div class="player-rank-row rank-3">
                <div class="rank-icon">🥉</div>
                <div class="player-info">
                  {res?.[2][1]?.id === lobby?.host?._id ? (
                    <span className="player-name">{lobby?.host?.name}</span>
                  ) : (
                    lobby?.players?.map((ele) =>
                      res?.[2][1]?.id === ele?._id ? (
                        <span key={ele._id} className="player-name">
                          {ele?.name}
                        </span>
                      ) : null
                    )
                  )}
                  <span class="player-title">Budget Boss</span>
                  <span class="player-description">
                    Manages to survive, but not rolling in riches.
                  </span>
                </div>
                <div class="player-money">${res?.[2][1]?.money}</div>
              </div>
            ) : (
              <div class="player-rank-row rank-4">
                <div class="rank-icon">💀</div>
                <div class="player-info">
                  {res?.[2][1]?.id === lobby?.host?._id ? (
                    <span className="player-name">{lobby?.host?.name}</span>
                  ) : (
                    lobby?.players?.map((ele) =>
                      res?.[2][1]?.id === ele?._id ? (
                        <span key={ele._id} className="player-name">
                          {ele?.name}
                        </span>
                      ) : null
                    )
                  )}
                  <span class="player-title">Broke Broker</span>
                  <span class="player-description">
                    Tried the market… but ended up bankrupt.
                  </span>
                </div>
                <div class="player-money">${res?.[2][1]?.money}</div>
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {res?.[3] ? (
          <div class="player-rank-row rank-4">
            <div class="rank-icon">💀</div>
            <div class="player-info">
              {res?.[3][1]?.id === lobby?.host?._id ? (
                <span className="player-name">{lobby?.host?.name}</span>
              ) : (
                lobby?.players?.map((ele) =>
                  res?.[3][1]?.id === ele?._id ? (
                    <span key={ele._id} className="player-name">
                      {ele?.name}
                    </span>
                  ) : null
                )
              )}
              <span class="player-title">Broke Broker</span>
              <span class="player-description">
                Tried the market… but ended up bankrupt.
              </span>
            </div>
            <div class="player-money">${res?.[3][1]?.money}</div>
          </div>
        ) : (
          ""
        )}
      </div>

      <button class="home-button" onClick={deleteGame}>
        Return To Home
      </button>
    </div>
  );
};

export default Result;
