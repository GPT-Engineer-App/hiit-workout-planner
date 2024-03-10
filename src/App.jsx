import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Workouts from "./pages/Workouts.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  );
}

export default App;
