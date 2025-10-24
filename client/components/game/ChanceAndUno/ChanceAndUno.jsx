import React from "react";
import "./ChanceAndUno.css";
const ChanceAndUno = ({ cut }) => {
  return (
    <div class="ChanceAndUNO">
      <div className="Cross" onClick={cut}>
        X
      </div>
      <div class="UNO">
        <h2>UNO (Treasury)</h2>
        <p class="instructions">
          When you land on UNO, roll (1-12) and follow the instructions.
        </p>
        <ol class="rules-list">
          <li>Pay a $500 speeding ticket.</li>
          <li>Bank error in your favor! Collect $2000.</li>
          <li>You are caught in a tax audit. Pay the Bank $3000.</li>
          <li>You are promoted! Collect a $2500 bonus from the Bank.</li>
          <li>Pay school and medical fees of $1500.</li>
          <li>You win a local lottery. Collect $1000.</li>
          <li>From the sale of stocks, you get $4000.</li>
          <li>
            Poor property maintenance! Pay $1000 to the Bank for immediate
            repairs.
          </li>
          <li>Pay your insurance premium. Pay $1500.</li>
          <li>You host a state dinner. Collect $500 from each player.</li>
          <li>Holiday bonus! Collect $2000 from the Bank.</li>
          <li>
            You've won the World Tycoon Grand Prize! Collect $5,000 from the
            Bank.
          </li>
        </ol>
      </div>

      <div class="chance">
        <h2>CHANCE</h2>
        <p class="instructions">
          When you land on CHANCE, roll (1-12) and follow the instructions.
        </p>
        <ol class="rules-list">
          <li>Loss in the share market. Pay $2000 to the Bank.</li>
          <li>
            You have won a crossword competition. Collect $1000 from the Bank.
          </li>
          <li>Pay a $1500 fine for a traffic violation.</li>
          <li>Your building loan is approved! Collect $5000 from the Bank.</li>
          <li>
            Your businesses are booming! The Bank pays you a dividend of $3000.
          </li>
          <li>
            Caught dumping industrial waste. Pay a $2500 environmental fine.
          </li>
          <li>It's your birthday! Collect $1000 from each player.</li>
          <li>You are elected Chairman of the Board. Pay each player $500.</li>
          <li>Loss due to fire in your godown. Pay $2500.</li>
          <li>Pay a $500 fine for a traffic violation.</li>
          <li>Collect your $1500 salary.</li>
          <li>Your car needs repairs. Pay $1000.</li>
        </ol>
      </div>
    </div>
  );
};

export default ChanceAndUno;
