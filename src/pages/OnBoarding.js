import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import OnBoarding1 from "../images/Onboarding/1.png";
import OnBoarding2 from "../images/Onboarding/2.png";
import OnBoarding3 from "../images/Onboarding/3.png";
import OnBoarding4 from "../images/Onboarding/4.png";
import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles(theme => ({
//   progress: {
//     backgroundColor: "transparent",
//   },
// }));

const displays = {
  0: {
    img: OnBoarding1,
    text: "Kumpulkan Sampah Kain",
  },
  1: {
    img: OnBoarding2,
    text: "Pilih Penjemputan atau Tukarkan ke Mitra",
  },
  2: {
    img: OnBoarding3,
    text: "Kumpulkan Poin dan Tukarkan Menjadi Rupiah",
  },
  3: {
    img: OnBoarding4,
    text: "Mulai Jadi Agen Sampah Kain, Jaga Ekosistem Laut",
  },
};

const OnBoarding = () => {
  const push = useNavigate();
  const [showLogo, setShowLogo] = useState(true);
  // const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === 3) {
      push("/");
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // };

  const LogoDisplay = () => {
    return (
      <Box textAlign="center" pt={6}>
        <img src={Logo} width="40%" height="auto" alt="Clothrash's logo" />
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 3 * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box
      component="main"
      sx={{ backgroundColor: `${showLogo ? "#26BAEE" : "white"}` }}
      height="90vh"
    >
      {showLogo && <LogoDisplay />}
      <Box p={4} display={`${showLogo ? "none" : "block"}`}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="text"
            sx={{ fontWeight: 700, color: "black" }}
            onClick={() => push("/")}
          >
            Skip
          </Button>
        </Box>
        <Box textAlign="center">
          <img
            width="60%"
            src={displays[activeStep]?.img}
            alt={displays[activeStep]?.text}
          />
        </Box>
        <Typography
          component="p"
          variant="h5"
          fontWeight={700}
          textAlign="center"
        >
          {displays[activeStep]?.text}
        </Typography>
        <Box mt={3} mb={4}>
          <MobileStepper
            variant="progress"
            steps={4}
            position="static"
            activeStep={activeStep}
            sx={{ justifyContent: "center" }}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <IconButton
            aria-label="next"
            sx={{
              color: "white",
              backgroundColor: "#26BAEE",
            }}
            onClick={handleNext}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default OnBoarding;
