// GET home page
import db from "../database/config.js";

const getRandomFlag = async (req, res) => {
  try {
    const query = {
      text: "SELECT * FROM flags ORDER BY RANDOM() LIMIT 1;",
    };

    const result = await db.query(query);
    console.log("result", result.rows);

    // const response = await db.query("select * from capitals");
    res.send({ success: true, data: result.rows[0] });
  } catch (err) {
    res.send({ success: false, error: err.stack });
  }
};

const checkFlag = async (req, res) => {
  const { country, capital } = req.body;

  try {
    const query = {
      text: "select * from capitals where country = $1",
      values: [country],
    };

    const result = await db.query(query);

    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const nextQuestion = () => {
  //   const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  const randomFlag = getRandomFlag();

  currentQuestion = randomFlag;
};

export { getRandomFlag, checkFlag };
