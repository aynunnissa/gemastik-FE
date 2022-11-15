import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const url = useLocation().pathname;
  const path = url.split("/");
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="sm" sx={{ position: "relative" }}>
        <Box sx={{ minHeight: "90vh", backgroundColor: "#FFFFFF" }}>
          {children}
        </Box>
        {path[1] !== "on-boarding" && (
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

export default Layout;
