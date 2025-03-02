import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header></Header>
      </div>
      <div className="main-container">
        <Outlet />
      </div>
      <div className="footer-container"></div>
    </div>
  );
};

export default App;
