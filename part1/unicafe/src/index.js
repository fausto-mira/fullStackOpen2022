import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = () => <h1>give feedback</h1>;

/*
const Stat = ({ value, text }) => (
  <p>
    {text}
    {value}
  </p>
);
*/

const Statistics = ({ good, neutral, bad, all }) => {
  if (good == 0 && bad == 0 && neutral == 0) return <p>No feedback given</p>;
  else {
    return (
      /*
      <div>
        <Stat value={good} text="good " />
        <Stat value={neutral} text="neutral " />
        <Stat value={bad} text="bad " />
        <Stat value={all} text="all " />
        <Stat value={(good - bad) / all} text="average " />
        <Stat value={(good / all) * 100} text="positive %" />
      </div>
      */
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good - bad) / all}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>% {(good / all) * 100}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};

const App = () => {
  const [good, addGood] = useState(0);
  const [neutral, addNeutral] = useState(0);
  const [bad, addBad] = useState(0);

  const all = good + neutral + bad;

  return (
    <div>
      <Header />

      <button onClick={() => addGood(good + 1)}>good</button>
      <button onClick={() => addNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => addBad(bad + 1)}>bad</button>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
