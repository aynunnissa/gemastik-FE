import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="sm" sx={{ position: "relative" }}>
        <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
          {children}
        </Box>
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
      </Container>
    </>
  );
};

export default Layout;
