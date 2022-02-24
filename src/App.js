import logo from "./logo.svg";
import "./App.css";
import "./style/main.scss";
import Index from "./components/Index";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router forceRefresh={false}>
        <Index />
      </Router>
    </div>
  );
}

export default App;
