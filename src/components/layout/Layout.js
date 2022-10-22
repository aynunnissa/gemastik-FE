import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
          {children}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
