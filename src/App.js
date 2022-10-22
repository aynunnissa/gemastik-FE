import { ToastContainer } from "react-toastify";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layout/Layout";
import AllRoute from "./router/router";
import ThemeConfig from "./theme";

function App() {
  return (
    <ThemeConfig>
      <Layout>
        <AllRoute />
        <ToastContainer />
      </Layout>
    </ThemeConfig>
  );
}

export default App;
