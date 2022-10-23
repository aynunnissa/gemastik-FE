import { ToastContainer } from "react-toastify";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layout/Layout";
import AllRoute from "./router/router";
import ThemeConfig from "./theme";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeConfig>
        <Layout>
          <AllRoute />
          <ToastContainer />
        </Layout>
      </ThemeConfig>
    </BrowserRouter>
  );
}

export default App;
