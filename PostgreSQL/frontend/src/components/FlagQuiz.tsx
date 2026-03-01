import "../../public/assets/main-flags.css";
import axios from "axios";
import { useState, useEffect, useEffectEvent } from "react";

type QuestionFlag = {
  flag: string;
  country: string;
};

const FlagQuiz = () => {
  const [question, setQuestion] = useState<QuestionFlag | null>(null);
  const [counter, setCounter] = useState(0);

  const reset = () => {
    setCounter(0);
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:3000/flags");

      const data = response.data;

      setQuestion(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <form className="container" action="/submit" method="post">
      <div className="horizontal-container">
        <h3>
          Total Score:
          <span id="score">0</span>
        </h3>
      </div>

      <h1 id="countryFlag">{question?.flag}</h1>
      <div className="answer-container">
        <input
          type="text"
          name="answer"
          id="userInput"
          placeholder="Name the country"
          autoFocus
          autoComplete="off"
        />
      </div>
      <button type="submit">
        SUBMIT(locals.wasCorrect)
        <span className="checkmark">✔</span>
        (locals.wasCorrect===false)
        <span className="cross" id="error">
          ✖
        </span>
      </button>
    </form>
  );
};

export default FlagQuiz;
