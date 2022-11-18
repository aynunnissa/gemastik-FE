import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QRScanner from "../../components/scanQR/QRScanner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { client } from "../../lib/client";
import { toast } from "react-toastify";

const ScanQRPenukar = () => {
  const push = useNavigate();
  const [idPengguna, setIdPengguna] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeId = e => {
    setIdPengguna(e.target.value);
  };

  async function getDataPenukar() {
    if (idPengguna === "") {
      toast.error("Id Pengguna tidak boleh kosong");
      setIsSearching(false);
      return;
    }
    const { data: userData, status } = await client.get(
      `/api/resource/${idPengguna}`
    );
    if (status === 200) {
      push(`/mitra/input-data-penukar/${userData[0].idPengguna}`);
    } else {
      toast.error("Penukar tidak ditemukan");
    }
    setIsSearching(false);
  }

  return (
    <Box>
      <Box width="100%" sx={{ backgroundColor: "rgba(0, 0, 0, 0.54)" }} pb={6}>
        {/* <Box display="flex" gap={4} px={3} pb={4} pt={2}>
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
        </Box> */}
        <Box pt={3}>
          <QRScanner />
        </Box>
        <Box
          display="flex"
          py={2}
          px={3}
          mx={4}
          mt={3}
          gap={3}
          sx={{ borderRadius: "10px", backgroundColor: "white" }}
        >
          <Box display="flex" gap={2} width="100%">
            <Box width="100%">
              <TextField
                id="input-with-icon-textfield"
                label="Cari berdasarkan Id"
                value={idPengguna}
                onChange={e => handleChangeId(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="standard"
              />
            </Box>
          </Box>
          <Box alignSelf="end">
            {!isSearching && (
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#90CAF9", color: "black" }}
                onClick={getDataPenukar}
              >
                Cari
              </Button>
            )}
            {isSearching && (
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#90CAF9", color: "black" }}
                disabled
              >
                Mencari...
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScanQRPenukar;
