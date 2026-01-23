import "./App.css";
import { Routes, Route } from "react-router-dom";
import ReversesTransaction from "./components/dashboard/reverses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReversesTransaction />} />
    </Routes>
  );
}

export default App;
