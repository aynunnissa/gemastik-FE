import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
  CardMedia,
  Button,
} from "@mui/material";
import "./HomepagePenabung.css";
import Penjemputan from "./Penjemputan.svg";
import Cloth from "../../images/Mitra/cloth.png";
import TarikDana from "./TarikDanaSementara.svg";
import { client } from "../../lib/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";

const HomepageMitra = () => {
  const [user, setUser] = useState({});
  const [poin, setPoin] = useState(0);
  const [koleksi, setKoleksi] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData() {
    const { data: userData, status } = await client.get("/api/resource");
    if (status === 200) {
      setUser(userData[0]);
    } else {
      toast.error("Gagal mengambil data pengguna");
    }
  }

  async function getUserPoin() {
    const { data: dataPoin, status } = await client.get("/api/poin");
    if (status === 200) {
      setPoin(dataPoin.poin);
    } else {
      toast.error("Gagal mengambil total poin");
    }
  }

  async function getUserKoleksi() {
    const { data: dataKoleksi, status } = await client.get(
      "/api/koleksi-mitra"
    );
    if (status === 200) {
      setKoleksi(dataKoleksi[0]?.totalBerat);
    } else {
      toast.error("Gagal mengambil berat kain terkumpul");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUserData();
    getUserPoin();
    getUserKoleksi();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Box component="main" pb={2}>
      <Container fixed className="banner">
        <Typography component="h3" className="extra-bold">
          CLOTHRASH
        </Typography>
        <Typography component="h2" className="semi-bold">
          <b>Hello, {user?.nama}</b>
        </Typography>
      </Container>

      <Card className="card-homepage-penabung text-left">
        <Box className="col">
          <Box className="center row-box">
            <Box className="col" sx={{ width: "15rem" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h2" className="text-bold">
                  Penjemputan
                </Typography>
                <Typography component="h3">
                  Ajukan penjemputan agar sampah kain mu segera diambil
                  Penjemput
                </Typography>
              </CardContent>
            </Box>
            <Box className="col">
              <CardMedia
                component="img"
                className="card-media2"
                image={Penjemputan}
                alt="Penjemputan"
              />
            </Box>
          </Box>
          <Box className="col">
            <Link to="/request-penjemputan">
              <Button variant="contained" className="button-ajukan">
                Ajukan Pejemputan
              </Button>
            </Link>
          </Box>
        </Box>
      </Card>

      <Card className="card-homepage-penabung text-left">
        <Box className="col">
          <Box className="center row-box">
            <Box className="col" sx={{ width: "15rem" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h2" className="text-bold">
                  Imbalan
                </Typography>
                <Box className="row-box">
                  <Typography component="h2" className="black">
                    {poin}
                  </Typography>
                  <Typography component="p" className="poin-text">
                    poin
                  </Typography>
                </Box>
              </CardContent>
            </Box>
            <Box className="col">
              <CardMedia
                component="img"
                className="card-media"
                image={TarikDana}
                alt="TarikDana"
              />
            </Box>
          </Box>
        </Box>
      </Card>

      <Card className="card-homepage-penabung text-left">
        <Box className="col">
          <Box className="center row-box">
            <Box className="col" sx={{ width: "15rem" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h2" className="text-bold">
                  Sampah Terkumpul
                </Typography>
                <Typography component="h3">
                  <strong>{koleksi}</strong>
                  <span style={{ color: "#26BAEE" }}>/</span>10Kg
                </Typography>
              </CardContent>
            </Box>
            <Box className="col">
              <CardMedia
                component="img"
                className="card-media2"
                image={Cloth}
                alt="Penjemputan"
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default HomepageMitra;
