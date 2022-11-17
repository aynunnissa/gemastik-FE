import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const History = () => {
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
          <Paper>
            <Box py={3} px={{ xs: 2, md: 3 }} rowGap={3}>
              <Stack
                justifyContent="space-between"
                direction="row"
                flexWrap="wrap"
              >
                <Typography component="p" variant="subtitle2" fontWeight={700}>
                  #PN124483737
                </Typography>
                <Typography component="p" variant="subtitle2" color="grey">
                  20 Januari, 2022
                </Typography>
              </Stack>
              <Typography
                mt={2}
                component="p"
                variant="h6"
                fontWeight={600}
                color="#26BAEE"
              >
                15 Points
              </Typography>
              <Typography component="p" variant="subtitle2" mb={2}>
                0.5Kg sampah kain
              </Typography>
              <Typography component="p" color="grey" variant="caption">
                Ditukarkan ke mitra Jasa Jahit Pak Anwar
              </Typography>
            </Box>
          </Paper>
          <Paper>
            <Box py={3} px={{ xs: 2, md: 3 }} rowGap={3}>
              <Stack
                justifyContent="space-between"
                direction="row"
                flexWrap="wrap"
              >
                <Typography component="p" variant="subtitle2" fontWeight={700}>
                  #PN124483737
                </Typography>
                <Typography component="p" variant="subtitle2" color="grey">
                  20 Januari, 2022
                </Typography>
              </Stack>
              <Typography
                mt={2}
                component="p"
                variant="h6"
                fontWeight={600}
                color="#26BAEE"
              >
                15 Points
              </Typography>
              <Typography component="p" variant="subtitle2" mb={2}>
                0.5Kg sampah kain
              </Typography>
              <Typography component="p" color="grey" variant="caption">
                Ditukarkan ke mitra Jasa Jahit Pak Anwar
              </Typography>
            </Box>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default History;
