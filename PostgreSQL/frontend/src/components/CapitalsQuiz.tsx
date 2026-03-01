import { useEffect, useState, type ChangeEvent } from "react";
import "../../public/assets/main-capitals.css";
import axios from "axios";

type Question = {
  capital: string;
  country: string;
};

const CapitalsQuiz = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [counter, setCounter] = useState(0);
  const [capital, setCapital] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:3000/capitals");

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

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (capital === question?.capital) {
      setCounter((prev) => prev + 1);
      fetchQuestion();
    } else {
      setCounter(0);
      setIsCorrect(false);
    }
    setCapital("");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setCapital(e.target.value);
  };

  const handleShow = () => {
    setIsCorrect(true);
    fetchQuestion();
  };

  return isCorrect ? (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <div className="horizontal-container">
        <h3>
          Total Score:
          <span id="score">{counter}</span>
        </h3>
      </div>

      <h1 id="countryName">{question?.country}</h1>
      <div className="answer-container">
        <input
          type="text"
          name="answer"
          id="userInput"
          value={capital}
          placeholder="Enter the capital"
          onChange={(e) => handleInputChange(e)}
          autoFocus
          autoComplete="off"
        />
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  ) : (
    <a
      // href="/capitals-quiz"
      className="restart-button"
      onClick={handleShow}
    >
      Restart
    </a>
  );
};

export default CapitalsQuiz;
