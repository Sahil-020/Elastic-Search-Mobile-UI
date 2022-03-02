import logo from "./logo.svg";
import "./App.css";
import "./style/main.scss";
import Index from "./components/Index";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router forceRefresh={false}>
        <Index />
      </Router>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default App;
