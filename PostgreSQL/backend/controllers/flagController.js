// GET home page
import db from "../database/config.js";

const getRandomFlag = async (req, res) => {
  try {
    const query = {
      text: "SELECT * FROM flags ORDER BY RANDOM() LIMIT 1;",
    };

    const result = await db.query(query);
    console.log("result", result.rows);

    const question = result.rows[0];

    const currentQuestion = {
      ...question,
      flagString: emojiCountryCode(question.flag),
    };

    // const response = await db.query("select * from capitals");
    res.send({ success: true, data: currentQuestion });
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

    const question = result.rows[0];

    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

function emojiCountryCode(flag) {
  const formattedCode =
    String.fromCharCode(flag.codePointAt(0) - 127397) +
    String.fromCharCode(flag.codePointAt(2) - 127397);
  return formattedCode.toLowerCase();
}

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = {
    ...randomCountry,
    flagString: emojiCountryCode(randomCountry.flag),
  };
}

export { getRandomFlag, checkFlag };
