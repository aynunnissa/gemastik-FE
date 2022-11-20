import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SuccessImage from "../../images/success.png";
import { connect } from "react-redux";

const Success = ({ auth }) => {
  const push = useNavigate();
  return (
    <Box style={{padding: "30px"}}>
      <Box textAlign="center">
        <img height="auto" src={SuccessImage} alt="Penukaran berhasil" />
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
      {auth.role === "Mitra" || auth.role === "Penabung" ? (
        <Typography textAlign="center" component="p" variant="body2">
          Berhasil melakukan konfirmasi penukaran sampah kain. Pastikan
          menyimpan sampah kain dengan baik dan lakukan request penjemputan jika
          sudah memenuhi minimum berat sampah.
        </Typography>
      ) : (
        <Typography textAlign="center" component="p" variant="body2">
          Berhasil melakukan konfirmasi penukaran sampah kain.
        </Typography>
      )}

      <Stack mt={3} justifyContent="center">
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Success);
