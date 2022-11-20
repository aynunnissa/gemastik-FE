import { React, useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { client } from "../../lib/client";
import { toast } from "react-toastify";

const JemputSampah = () => {
  const { idRequest } = useParams();
  const [dataRequest, setDataRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getRequestData() {
    const { data, status } = await client.get(
      "/api/request-penjemputan/" + idRequest
    );
    console.log(data);
    if (status === 200) {
      setDataRequest(data[0]);
    } else {
      toast.error("Gagal mengambil data request");
    }
    setIsLoading(false);
  }

  let urlImage = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+EA4335(${dataRequest.longitude},${dataRequest.latitude})/${dataRequest.longitude},${dataRequest.latitude},14/400x250?access_token=pk.eyJ1IjoiYWxmbm1zIiwiYSI6ImNsYWxrdjIwdzA2dmEzbnBlZDg4MjhseHEifQ.xEaEAB-r-ISe7YIkuvRpaA`;
  useEffect(() => {
    getRequestData();
  }, []);

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div>
      <div>
        <div className="penjemput header">
          <div className="penjemput title">Jemput Sampah</div>
          <div className="penjemput subtitle">
            Jemput sampah ke mana hari ini?
          </div>
        </div>
        <div className="pickup card" style={{marginBottom: "5vh"}}>
          <Typography
            variant="h6"
            component="div"
            className="request-title"
            fontWeight={600}
          >
            Pick-Up Point
          </Typography>
          <Card sx={{ minWidth: 275 }} variant="outlined">
            <img src={urlImage} class="unselectable"></img>
          </Card>
          <br />
          <Typography
            variant="h6"
            component="div"
            className="request-title"
            fontWeight={600}
          >
            Informasi Sampah Kain
          </Typography>
          {!isLoading && (
            <Box
              sx={{
                "& .MuiTextField-root": { m: 2 },
              }}
            >
              <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardContent>
                  <div>
                    <TextField
                      disabled
                      label="ID Penukar"
                      defaultValue={dataRequest.penukar.idPengguna}
                      variant="standard"
                      fullWidth
                    />

                    <TextField
                      disabled
                      label="Nama Penukar"
                      defaultValue={dataRequest.penukar.nama}
                      variant="standard"
                      fullWidth
                    />
                    <TextField
                      disabled
                      label="Nomor Telepon Penukar"
                      defaultValue={dataRequest.penukar.noTelp}
                      variant="standard"
                      fullWidth
                    />
                    <TextField
                      disabled
                      label="Berat"
                      defaultValue={dataRequest.berat + " kg"}
                      variant="standard"
                      fullWidth
                    />
                    <TextField
                      disabled
                      label="Alamat"
                      defaultValue={dataRequest.alamat}
                      variant="standard"
                      fullWidth
                    />
                    <TextField
                      disabled
                      label="Foto Sampah"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <img
                            src={dataRequest.fotoSampah}
                            style={{ maxWidth: "10rem" }}
                          />
                        ),
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default JemputSampah;
