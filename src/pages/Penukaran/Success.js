import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SuccessImage from "../../images/success.png";

const Success = () => {
  const push = useNavigate();
  return (
    <Box py={5} mx={4}>
      <Box textAlign="center">
        <img
          width="80%"
          height="auto"
          src={SuccessImage}
          alt="Penukaran berhasil"
        />
      </Box>
      <Typography
        textAlign="center"
        component="h1"
        variant="h6"
        fontWeight={700}
        sx={{ margin: "18px 0px" }}
      >
        Penukaran Sampah Kain Berhasil
      </Typography>
      <Typography textAlign="center" component="p">
        Berhasil melakukan konfirmasi penukaran sampah kain. Pastikan menyimpan
        sampah kain dengan baik dan lakukan request penjemputan jika sudah
        memenuhi minimum berat sampah.
      </Typography>
      <Stack mt={5} justifyContent="center">
        <Button
          variant="contained"
          onClick={() => {
            push("/");
          }}
        >
          Kembali ke Beranda
        </Button>
      </Stack>
    </Box>
  );
};

export default Success;
