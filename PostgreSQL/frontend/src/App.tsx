import { Routes, Route } from "react-router";
import CapitalsQuiz from "./components/CapitalsQuiz";
import FlagQuiz from "./components/FlagQuiz";
import Home from "./components/HomePage";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/"></Route>
      <Route element={<CapitalsQuiz />} path="/capitals-quiz"></Route>
      <Route element={<FlagQuiz />} path="/flags-quiz"></Route>
    </Routes>
  );
}

export default App;
