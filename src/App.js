import logo from "./logo.svg";
import "./App.css";
import "./style/main.scss";
import Main from "./components/jewelry/JewelryMain";
import Index from "./components/Index";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Index />
      </Router>
    </div>
  );
}

export default App;
