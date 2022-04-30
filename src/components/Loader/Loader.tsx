import { Spin } from "antd";
import "./Loader.css";

const Loader = ({ message = "Loading" }) => {
  return (
    <div className="loader-container">
      <Spin size="large" />
      <h3>{message}</h3>
    </div>
  );
};

export default Loader;
