"use client";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { themeColorActions } from "_store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Banner() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const secondColor = theme.palette.mode === "light" ? "#f5f7fa " : "#162055";

  // useEffect(() => {
  //   dispatch(themeColorActions.setThemeColor('dark'));

  //   return () => {
  //     dispatch(themeColorActions.setThemeColor('light'));
  //   };
  // }, [dispatch]);

  return (
    <Box
    // sx={{
    //   backgroundImage: `linear-gradient(${theme.palette.background.default}, ${secondColor})`,
    //   height: { xs: "300px", sm: "600px" },
    //   backgroundRepeat: "no-repeat",
    //   backgroundPosition: "center center",
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   backgroundSize: "contain",
    //   textAlign: "center",
    // }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100vw", sm: 800 },
          mx: "auto",
          textAlign: "center",
          py: { xs: 6, sm: 8 },
          px: 2,
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: { xs: "2.5rem", sm: "4.2rem" },
            fontWeight: 700,
            lineHeight: 1.2,
          }}
          color="text.primary"
        >
          Know your stock first, then trade
        </Typography>
        <Typography
          component="div"
          sx={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: { xs: "1.2rem", sm: "1.6rem" },
            mt: 3,
            mb: { xs: 5, sm: 7 },
          }}
          color="text.secondary"
        >
          Get finacial data and prepared analytics and for shares helping you
          find the perfect trade. Suitable for investors with all skill levels
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
            borderRadius: 6,
            px: { xs: 4, sm: 5 },
            py: 1,
            mr: { xs: 2, sm: 4 },
          }}
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
            borderRadius: 6,
            py: 1,
            px: { xs: 4, sm: 5 },
          }}
        >
          Create account
        </Button>
        {/* <Typography sx={{ fontSize: ".9rem", mt: 6 }}>
          Charts are powered by{" "}
          <Typography
            component={Link}
            href="https://www.tradingview.com/"
            target="_blank"
            sx={{ color: "primary.main" }}
          >
            TradingView
          </Typography>
        </Typography> */}
      </Box>
    </Box>
  );
}
