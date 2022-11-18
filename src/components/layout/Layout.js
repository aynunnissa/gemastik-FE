import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = ({ children, auth }) => {
  const push = useNavigate();
  const url = useLocation().pathname;
  const path = url.split("/");

  useEffect(() => {
    if (!auth.isLoggedIn) {
      push("/auth/login");
    } else if (auth.isLoggedIn && path[1] === "auth") {
      push("/");
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="sm" sx={{ position: "relative" }}>
        <Box sx={{ minHeight: "90vh", backgroundColor: "#FFFFFF" }}>
          {children}
        </Box>
        {path[1] !== "on-boarding" && path[1] !== "auth" && (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="sm">
              <Footer />
            </Container>
          </Box>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Layout);
