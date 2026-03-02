import { useEffect, useState, type ChangeEvent } from "react";
import "../../public/assets/main-capitals.css";
import axios from "axios";

import { type FlagQuestion, type GameStatus } from "../types/types";

const FlagQuiz = () => {
  const [question, setQuestion] = useState<FlagQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<GameStatus>("playing");

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:3000/flags");

      const data = response.data;

      console.log("capital", data);

      setQuestion(data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const startNewQuestion = () => {
    setAnswer("");
    fetchQuestion();
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!question) return;

    if (answer.trim().toLowerCase() === question.name.toLowerCase()) {
      setScore((prev) => prev + 1);
      startNewQuestion();
    } else {
      setStatus("gameOver");
      setScore(0);
    }
  };

  const handleRestart = () => {
    setStatus("playing");
    setScore(0);
    startNewQuestion();
  };

  if (status === "gameOver") {
    return (
      <a
        // href="/capitals-quiz"
        className="restart-button"
        onClick={handleRestart}
      >
        Restart
      </a>
    );
  }

  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <div className="horizontal-container">
        <h3>
          Total Score:
          <span id="score">{score}</span>
        </h3>
      </div>
      {/* <h1 id="countryName">{question?.flagString}</h1> */}
      {question && (
        <div className="country-flag-img">
          <img
            id="country-flag"
            src={`https://flagcdn.com/w160/${question.flagString}.png`}
            alt={`Flag of ${question.flagString}`}
            width="200"
          />
        </div>
      )}
      <div className="answer-container">
        <input
          type="text"
          name="answer"
          id="userInput"
          value={answer}
          placeholder="Name the country"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAnswer(e.target.value)
          }
          autoFocus
          autoComplete="off"
        />
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default FlagQuiz;
