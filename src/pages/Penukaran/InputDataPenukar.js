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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../lib/client";
import { toast } from "react-toastify";
import moment from "moment";
import { connect } from "react-redux";

const InputDataPenukar = ({ auth }) => {
  const push = useNavigate();
  const { idPengguna } = useParams();
  const [penukar, setPenukar] = useState({});
  const [totalBerat, setTotalBerat] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBeratChange = e => {
    setTotalBerat(e.target.value);
  };

  async function getUserData() {
    const { data: userData, status } = await client.get(
      `/api/resource/${idPengguna}`
    );
    if (status === 200) {
      setPenukar(userData[0]);
    } else {
      toast.error("Gagal mengambil data penukar");
    }
    setIsLoading(false);
  }

  async function submitPenukaran() {
    setIsSubmitting(true);

    if (totalBerat <= 0) {
      toast.error("Berat kain harus lebih dari 0");
      setIsSubmitting(false);
      return;
    }

    if (penukar && totalBerat > 0) {
      const { data, status } = await client.post(
        `/api/create-penukaran/${idPengguna}`,
        {
          berat: totalBerat,
          penerima: auth.phone,
        }
      );
      if (status === 201) {
        push("/mitra/penukaran-berhasil");
      } else {
        toast.error("Gagal Login");
      }
    }

    setIsSubmitting(false);
  }

  useEffect(() => {
    if (idPengguna !== "") {
      getUserData();
    }
  }, []);

  if (isLoading) {
    return "Loading...";
  }

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
            mt={3}
            px={5}
            py={4}
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
              {moment().format("dddd, DD MMMM YYYY")}
              {/* Sabtu, 22 Oktober 2022 20:25 */}
            </Typography>
            <Box display="flex" mt={4} justifyContent="space-between">
              <Typography component="p" variant="body2" fontWeight={600}>
                Penukar
              </Typography>
              <Typography component="p" variant="body2" textAlign="right">
                {penukar?.nama}
              </Typography>
            </Box>
            <Box display="flex" mb={3} justifyContent="space-between">
              <Typography component="p" variant="body2" fontWeight={600}>
                ID Penukar
              </Typography>
              <Typography component="p" variant="body2" textAlign="right">
                {idPengguna}
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
                  value={totalBerat}
                  onChange={e => handleBeratChange(e)}
                />
                <Typography component="p" variant="subtitle1" ml={1}>
                  Kg
                </Typography>
              </Box>
            </Box>
          </Box>
          <Stack mb={6} mt={3} justifyContent="center">
            {!isSubmitting && (
              <Button variant="contained" onClick={submitPenukaran}>
                Konfirmasi Penukaran
              </Button>
            )}
            {isSubmitting && (
              <Button variant="contained" disabled>
                Loading...
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(InputDataPenukar);
