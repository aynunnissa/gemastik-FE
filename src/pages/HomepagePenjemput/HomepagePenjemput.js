import { React, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { client } from "../../lib/client";


import "./HomepagePenjemput.css";
import { toast } from "react-toastify";
import "./HomepagePenjemput.css";

const HomepagePenjemput = () => {
  const [dataRequest, setDataRequest] = useState([]);
  const push = useNavigate();

  async function getRequestData() {
    const { data, status } = await client.get("/api/request-penjemputan");

    if (status === 200) {
      let dataMenungguKonfirmasi = [];
      data.map((item) => {
        if (item.status === "Menunggu Konfirmasi") {
          dataMenungguKonfirmasi.push(item);
        }
      });
      setDataRequest(dataMenungguKonfirmasi);
    } else {
      toast.error("Gagal mengambil berat kain terkumpul");
    }
  }

  async function updateStatusDiterima(id) {
    const { data, status } = await client.put(
      "/api/update-status-penjemputan/" + id,
      {
        status: "Dalam Perjalanan",
      }
    );
    push("/jemput-sampah/" + id);
  }

  async function updateStatusDitolak(id) {
    const { data, status } = await client.put(
      "/api/update-status-penjemputan/" + id,
      {
        status: "Ditolak",
      }
    );
    window.location.reload(false);
  }
  useEffect(() => {
    getRequestData();
  }, []);

  return (
    <div>
      <div className="penjemput header">
        <div className="penjemput title">Jemput Sampah</div>
        <div className="penjemput subtitle">
          Jemput sampah ke mana hari ini?
        </div>
      </div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 2 },
        }}
      >
        <div className="pickup card" style={{ marginTop: "-8vh" }}>
          {dataRequest.map((item) => (
            <Card
              sx={{ minWidth: 275 }}
              variant="outlined"
              style={{ marginBottom: "5vh" }}
            >
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
                  <TextField
                    disabled
                    label="ID Penukar"
                    defaultValue={item.penukar.idPengguna}
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    disabled
                    label="Nama Penukar"
                    defaultValue={item.penukar.nama}
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    disabled
                    label="Nomor Telepon Penukar"
                    defaultValue={item.penukar.noTelp}
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    disabled
                    label="Berat"
                    defaultValue={item.berat + " kg"}
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    disabled
                    label="Alamat"
                    defaultValue={item.alamat}
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
                          src={item.fotoSampah}
                          style={{ maxWidth: "10rem" }}
                        />
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
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => updateStatusDitolak(item.id)}
                  >
                    Tolak
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => updateStatusDiterima(item.id)}
                  >
                    Terima
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default HomepagePenjemput;
