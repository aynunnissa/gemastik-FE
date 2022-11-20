import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { client } from "../../lib/client";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./History.css";

const History = ({ auth }) => {
  const [listPenukaran, setListPenukaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataRequest, setDataRequest] = useState([]);

  async function getRequestData() {
    const { data, status } = await client.get("/api/request-penjemputan");
    if (status === 200) {
      let dataHistory = [];
      data.map((item) => {
        if (
          item.status !== "Ditolak" ||
          item.status !== "Menunggu Konfirmasi"
        ) {
          dataHistory.push(item);
        }
      });
      setDataRequest(dataHistory);
    } else {
      toast.error("Gagal mengambil berat kain terkumpul");
    }
  }

  async function getListPenukaran() {
    const { data: dataPenukaran, status } = await client.get(
      "/api/list-penukaran"
    );
    if (status === 200) {
      setListPenukaran(dataPenukaran);
    } else {
      toast.error("Gagal mengambil data penukaran");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getListPenukaran();
    getRequestData();
  }, []);

  console.log(dataRequest);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Grid container justifyContent="center" pb={6}>
      {auth.role === "Mitra" || auth.role === "Penabung" ? (
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
            {listPenukaran.map((penukaran) => (
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
      ) : (
        <Grid item xs={10}>
          <Typography
            component="h1"
            variant="h6"
            fontWeight={700}
            textAlign="center"
            mt={2}
          >
            Riwayat Penjemputan
          </Typography>
          <Stack rowGap={3} mt={3}>
            {dataRequest.map((penukaran) => (
              <Link to={"/jemput-sampah/" + penukaran.id}>
                <div className="history-card">
                  {" "}
                  <Paper key={penukaran.id}>
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
                      </Stack>
                      <Typography
                        mt={2}
                        component="p"
                        variant="h6"
                        fontWeight={600}
                        color="#26BAEE"
                      >
                        {penukaran.status}
                      </Typography>
                      <Typography component="p" variant="subtitle2" mb={2}>
                        {penukaran.berat}Kg sampah kain
                      </Typography>
                      <Typography component="p" color="grey" variant="caption">
                        {penukaran.alamat}
                      </Typography>
                    </Box>
                  </Paper>
                </div>
              </Link>
            ))}
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {})(History);
