import { ArrowBack } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QRScanner from "../../components/scanQR/QRScanner";
import { useNavigate } from "react-router-dom";

const ScanQRPenukar = () => {
  const push = useNavigate();

  return (
    <Box>
      <Box width="100%" sx={{ backgroundColor: "rgba(0, 0, 0, 0.54)" }} pb={6}>
        <Box display="flex" gap={4} px={3} py={4}>
          <ArrowBack
            sx={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              push("/");
            }}
          />
          <Typography
            component="h1"
            variant="h6"
            color="white"
            fontWeight={700}
          >
            Scan QR Penukar
          </Typography>
        </Box>
        <Box mt={4}>
          <QRScanner />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
          p={3}
          mx={3}
          mt={4}
          sx={{ borderRadius: "20px", backgroundColor: "white" }}
        >
          <Box display="flex" gap={2}>
            <Box
              sx={{
                borderRadius: "10px",
                backgroundColor: "#1976D2",
              }}
              width="60px"
              height="60px"
              maxHeight="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <SearchIcon sx={{ color: "white" }} />
            </Box>
            <Box>
              <Typography component="p" fontWeight={700} variant="subtitle1">
                Cari berdasarkan ID Penukar
              </Typography>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="Masukkan ID Penukar..."
                fullWidth
              />
            </Box>
          </Box>
          <Box alignSelf="end">
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#90CAF9" }}
            >
              Cari
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScanQRPenukar;
