import { React, useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Sampah from "./sampah.jpg";

import "./HomepagePenjemput.css";

const HomepagePenjemput = () => {
  const [dataRequest, setDataRequest] = useState([]);
  const [accept, setAccepted] = useState(false);

  const fetchData = async () => {
    try {
      let requestData = await axios.get(
        "https://d11bc98b-4746-44a4-96d2-315a8141a623.mock.pstmn.io/request"
      );
      setDataRequest(requestData.data);
    } catch (err) {
      console.log(err);
      alert("Terdapat kesalahan saat fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const processedData = [
    {
      name: "ID Penukar",
      value: "ALTR190762212",
    },
    {
      name: "Nama Penukar",
      value: "MB Tshirt",
    },
    {
      name: "Nomor Telepon Penukar",
      value: "+6285890634915",
    },
    {
      name: "Alamat",
      value:
        "ITC Permata Hijau Lt. Dasar NO. 3 & 5 Jl. Arteri Permata Hijau RT.11/RW.10 Grogol utara Kby. Lama Jakarta Selatan DKI Jakarta 12210 ID, Jl. Arteri Permata Hijau No.3, RT.1/RW.10, Grogol Utara, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12210",
    },
    {
      name: "Berat Sampah",
      value: 10 + " " + "kg",
    },
  ];

  function changeAcceptState() {
    setAccepted(!accept);
  }

  console.log(accept);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "40ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <div className="penjemput header">
          <div className="penjemput title">Jemput Sampah</div>
          <div className="penjemput subtitle">
            Jemput sampah ke mana hari ini?
          </div>
        </div>
        {!accept && (
          <div className="request card">
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  className="request-title"
                  fontWeight={600}
                >
                  Request Baru
                </Typography>
                <div>
                  {processedData.map((item) => (
                    <TextField
                      disabled
                      label={item.name}
                      defaultValue={item.value}
                      variant="standard"
                      fullWidth
                    />
                  ))}
                  <TextField
                    disabled
                    label="Foto Sampah"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <img src={Sampah} style={{ maxWidth: "10rem" }} />
                      ),
                    }}
                  />
                </div>
              </CardContent>
              <CardActions
                style={{ justifyContent: "flex-end", padding: "1rem" }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  <Button size="small" variant="text">
                    Tolak
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={changeAcceptState}
                  >
                    Terima
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </div>
        )}
        {accept && (
          <div className="pickup card">
            <Typography variant="h6" component="div" className="request-title" fontWeight={600}>
              Pick-Up Point
            </Typography>
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent></CardContent>
            </Card>
            <br />
            <Typography variant="h6" component="div" className="request-title" fontWeight={600}>
              Informasi Sampah Kain
            </Typography>
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <div>
                  {processedData.map((item) => (
                    <TextField
                      disabled
                      label={item.name}
                      defaultValue={item.value}
                      variant="standard"
                      fullWidth
                    />
                  ))}
                  <TextField
                    disabled
                    label="Foto Sampah"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <img src={Sampah} style={{ maxWidth: "10rem" }} />
                      ),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Box>
  );
};

export default HomepagePenjemput;
