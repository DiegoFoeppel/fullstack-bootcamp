// GET home page
import db from "../database/config.js";

const getRandomCapital = async (req, res) => {
  try {
    const query = {
      text: "SELECT * FROM capitals ORDER BY RANDOM() LIMIT 1;",
    };

    const result = await db.query(query);

    console.log("result", result.rows);

    // const response = await db.query("select * from capitals");
    res.send({ success: true, data: result.rows[0] });
  } catch (err) {
    res.send({ success: false, error: err.stack });
  }
};

const checkCapital = async (req, res) => {
  const { country, capital } = req.body;

  const query = {
    text: "select * from capitals where country = $1",
    values: [country],
  };

  const result = await db.query(query);

  //   console.log(res.rows[0]);

  res.send(result.rows[0]);
};

const nextQuestion = () => {
  //   const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  const randomCountry = getRandomCapital();

  currentQuestion = randomCountry;

  //   getRandomCapital();
};

export { getRandomCapital, checkCapital };
