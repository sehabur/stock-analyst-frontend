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
    // sx={(theme) => ({
    //   width: "100%",
    //   backgroundImage:
    //     theme.palette.mode === "light"
    //       ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)"
    //       : "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
    //   backgroundImage: `radial-gradient(${theme.palette.background.default}, ${secondColor})`,
    //   backgroundRepeat: "no-repeat",
    // })}
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
          maxWidth: { xs: "100vw", sm: 700 },
          mx: "auto",
          textAlign: "center",
          pt: { xs: 3, sm: 6 },
          pb: { xs: 0, sm: 3 },
          px: 2,
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: { xs: "2.4rem", sm: "3.8rem" },
            fontWeight: 700,
            lineHeight: 0.9,
          }}
          color="text.primary"
        >
          Know your{" "}
          <Typography
            component="span"
            color="primary.main"
            sx={{ fontSize: "inherit", fontWeight: "inherit" }}
          >
            stock
          </Typography>{" "}
          first, then trade
        </Typography>
        <Typography
          component="div"
          sx={{
            // fontFamily: "'Barlow', sans-serif",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            mt: 3,
            mb: { xs: 3, sm: 4 },
          }}
          color="text.secondary"
        >
          Get finacial data and prepared analytics and for shares helping you
          find the perfect trade. Suitable for investors with all skill levels
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="warning"
            sx={{
              fontSize: { xs: "1rem", sm: "1rem" },
              // borderRadius: 2,
              px: { xs: 3, sm: 4 },
              py: 1,
              mr: { xs: 2, sm: 4 },
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: { xs: "1rem", sm: "1rem" },
              // borderRadius: 2,
              py: 1,
              px: { xs: 3, sm: 5 },
            }}
          >
            Create account
          </Button>
        </Box>
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
