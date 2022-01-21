import logo from "./logo.svg";
import "./App.css";
import "./style/main.scss";
import Main from "./components/Main";
import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Main />
      {/* </Router> */}
    </div>
  );
}

export default App;
