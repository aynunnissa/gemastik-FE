import { Box, Paper, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { client } from "../../lib/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const user = {
  idUser: "123",
  namaUser: "Aynun Nissa Setiawan",
};
// idPengguna
const Profile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData() {
    const { data: userData, status } = await client.get("/api/resource");
    if (status === 200) {
      setUser(userData[0]);
    } else {
      toast.error("Gagal mengambil data pengguna");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Box minHeight="90vh" bgcolor="#26BAEE" py={5} px={5}>
      <Paper>
        <Box px={3} position="relative" rowGap={2}>
          <Box position="relative" display="flex" justifyContent="center">
            <Box
              position="absolute"
              borderRadius="50%"
              width="50px"
              height="50px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="-25px"
              bgcolor="white"
            >
              <AccountCircleIcon fontSize="large" />
            </Box>
          </Box>
          <Box mt="30px" textAlign="center">
            <Typography component="p" variant="subtitle1" fontWeight={700}>
              {user?.nama}
            </Typography>
            <Typography component="p" variant="subtitle2">
              {user?.noTelp}
            </Typography>
          </Box>
          <Box pt={3} pb={5} display="flex" justifyContent="center">
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "60%" }}
              value={user?.idPengguna}
              viewBox={`0 0 256 256`}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
