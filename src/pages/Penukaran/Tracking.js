import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ArrowBack } from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: "Menunggu Konfirmasi",
    description:
      "Request penjemputan limbah sedang dikonfirmasi oleh Admin Clothtrash",
  },
  {
    label: "Dalam Proses",
    description:
      "Yeay, Admin Clothrash sudah mengonfirmasi request penjemputan kamu.",
  },
  {
    label: "Penjemput Menuju Lokasi",
    description: "Tim penjemputan kami sedang menuju ke alamat penjemputan",
  },
  {
    label: "Penjemputan Selesai",
    description:
      "Tim penjemputan kami sudah menerima limbah pakaianmu. Pastikan kamu sudah menerima poin penukaran.",
  },
];

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  //   backgroundColor:
  //     theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  //   //   zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  marginLeft: -13,
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "grey",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ContentPasteIcon />,
    2: <HourglassEmptyIcon />,
    3: <LocalShippingIcon />,
    4: <CheckCircleOutlineIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
const Tracking = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const currentStep = 2;
  const push = useNavigate();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={4} px={3} py={4}>
        <ArrowBack
          sx={{ cursor: "pointer" }}
          onClick={() => {
            push("/user/riwayat-penukaran");
          }}
        />
        <Typography component="h1" variant="h6" fontWeight={700}>
          Tracking Penukaran
        </Typography>
      </Box>
      <Grid container justifyContent="center" pb={6}>
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography component="p" variant="subtitle2">
              ID Penjemputan
            </Typography>
            <Typography
              component="p"
              variant="subtitle2"
              fontWeight={700}
              textAlign="right"
            >
              TR25343721627
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography component="p" variant="subtitle2">
              Total Berat Limbah
            </Typography>
            <Typography
              component="p"
              variant="subtitle2"
              fontWeight={700}
              textAlign="right"
            >
              12 Kg
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            sx={{ pointerEvents: "none" }}
          >
            {steps[3]?.label}
          </Button>
          <Box mt={2} mb={3}>
            <Divider />
          </Box>
          <Stepper orientation="vertical" sx={{ padding: "0px 0.5rem" }}>
            {steps.map((step, index) => (
              <Step key={step.label} active={index < currentStep}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    fontWeight={700}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography component="p" variant="subtitle2" color="grey">
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </>
  );
};

export default Tracking;
