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
import TarikDana from "./TarikDanaSementara.svg";
import Challenge from "./Challenge.svg";

const HomepagePenabung = () => {
  return (
    <Box component="main" pb={2}>
      <Container fixed className="banner">
        <Typography component="h3" className="extra-bold">
          CLOTHRASH
        </Typography>
        <Typography component="h2" className="semi-bold">
          <b>Hello, Annisa</b>
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
            <Button variant="contained" className="button-ajukan">
              Ajukan Pejemputan
            </Button>
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
                    500
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

      <Card
        className="card-homepage-penabung text-left"
        sx={{ backgroundColor: "#26BAEE", color: "white" }}
      >
        <Box className="col">
          <Box className="center row-box">
            <Box className="col" sx={{ width: "15rem" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h3" className="text-bold">
                  Ikuti challenge minggu ini dan raih poin sebanyak mungkin!
                </Typography>
              </CardContent>
            </Box>
            <Box className="col">
              <CardMedia
                component="img"
                className="card-media"
                image={Challenge}
                alt="Challenge"
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default HomepagePenabung;
