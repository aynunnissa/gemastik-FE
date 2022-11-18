import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { client } from "../../lib/client";

const History = () => {
  const [listPenukaran, setListPenukaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getListPenukaran() {
    const { data: dataPenukaran, status } = await client.get(
      "/api/list-penukaran"
    );
    if (status === 200) {
      console.log(dataPenukaran);
      setListPenukaran(dataPenukaran);
    } else {
      toast.error("Gagal mengambil data penukaran");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getListPenukaran();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Grid container justifyContent="center" pb={6}>
      <Grid item xs={10}>
        <Typography
          component="h1"
          variant="h6"
          fontWeight={700}
          textAlign="center"
          mt={2}
        >
          Riwayat Penukaran
        </Typography>
        <Stack rowGap={3} mt={3}>
          {listPenukaran.map(penukaran => (
            <Paper key={penukaran.timestamp}>
              <Box py={3} px={{ xs: 2, md: 3 }} rowGap={3}>
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  flexWrap="wrap"
                >
                  <Typography
                    component="p"
                    variant="subtitle2"
                    fontWeight={700}
                  >
                    {moment(penukaran.timestamp).format("DD MMMM, YYYY")}
                  </Typography>
                  {/* <Typography component="p" variant="subtitle2" color="grey">
                  20 Januari, 2022
                </Typography> */}
                </Stack>
                <Typography
                  mt={2}
                  component="p"
                  variant="h6"
                  fontWeight={600}
                  color="#26BAEE"
                >
                  {penukaran.poin} Points
                </Typography>
                <Typography component="p" variant="subtitle2" mb={2}>
                  {penukaran.berat}Kg sampah kain
                </Typography>
                <Typography component="p" color="grey" variant="caption">
                  Ditukarkan ke mitra Jasa Jahit Pak Anwar
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default History;
