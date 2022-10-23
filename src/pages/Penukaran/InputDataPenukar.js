import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const InputDataPenukar = () => {
  const push = useNavigate();

  return (
    <>
      <Box display="flex" gap={4} px={3} py={4}>
        <ArrowBack
          sx={{ cursor: "pointer" }}
          onClick={() => {
            push("/mitra/scan-qr-penukar");
          }}
        />
        <Typography component="h1" variant="h6" fontWeight={700}>
          Input Data Penukaran
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box
            mt={5}
            p={5}
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
            }}
          >
            <Typography
              component="h2"
              variant="body1"
              fontWeight={600}
              textAlign="center"
            >
              Penukaran ke Mitra
            </Typography>
            <Typography
              component="p"
              variant="caption"
              color="#5E5E5E"
              textAlign="center"
            >
              Sabtu, 22 Oktober 2022 20:25
            </Typography>
            <Box display="flex" mt={4} justifyContent="space-between">
              <Typography component="p" variant="body2" fontWeight={600}>
                Penukar
              </Typography>
              <Typography component="p" variant="body2" textAlign="right">
                Aynun Nissa Setiawan
              </Typography>
            </Box>
            <Box display="flex" mb={3} justifyContent="space-between">
              <Typography component="p" variant="body2" fontWeight={600}>
                ID Penukar
              </Typography>
              <Typography component="p" variant="body2" textAlign="right">
                CLTR190762212
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" mt={4} justifyContent="space-between">
              <Typography component="p" variant="body2" fontWeight={600}>
                Total Berat Kain
              </Typography>
              <Box display="flex" alignItems="center">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                />
                <Typography component="p" variant="subtitle1" ml={1}>
                  Kg
                </Typography>
              </Box>
            </Box>
          </Box>
          <Stack mt={5} justifyContent="center">
            <Button variant="contained">Konfirmasi Penukaran</Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default InputDataPenukar;
