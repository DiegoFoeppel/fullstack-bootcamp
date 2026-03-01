import { Link } from "react-router";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="select-quiz">
      <Link to="/capitals-quiz" className="link-item">
        Capitals
      </Link>
      <Link to="/flags-quiz" className="link-item">
        Flag
      </Link>
    </div>
  );
};

export default HomePage;
