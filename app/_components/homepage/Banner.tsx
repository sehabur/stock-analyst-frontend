"use client";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { themeColorActions } from "_store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";

import { alpha } from "@mui/material";

import EastRoundedIcon from "@mui/icons-material/EastRounded";

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
      sx={{ pt: 4, pb: 4 }}
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
      <Divider />
      <Box
        sx={(theme) => ({
          width: "100%",
          // backgroundImage:
          //   theme.palette.mode === "light"
          //     ? "linear-gradient(180deg, #ffffff, #f5f5f5)"
          //     : `linear-gradient( ${alpha("#090E10", 0.0)}, #101010)`,
          backgroundRepeat: "no-repeat",
          textAlign: "left",
          pt: { xs: 2, sm: 6 },
          pb: { xs: 4, sm: 4 },
          px: 2,
        })}
      >
        <Box
          sx={{
            maxWidth: { xs: "100vw", sm: 800 },
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            component="div"
            sx={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: { xs: "2.4rem", sm: "3.2rem" },
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
          <Box>
            <Typography
              sx={{
                // fontFamily: "'Barlow', sans-serif",
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
                mt: { xs: 2, sm: 0.5 },
                mb: { xs: 2.5, sm: 4 },
                lineHeight: 1.5,
              }}
              color="text.secondary"
            >
              Get finacial data and prepared analytics for stocks helping you
              find the perfect trade. Suitable for investors with all skill
              levels.
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<StarsRoundedIcon />}
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.1rem" },
                // borderRadius: 2,
                py: { xs: 1.1, sm: 1.2 },
                px: { xs: 3, sm: 4 },
                "& .MuiButton-startIcon": {
                  fontSize: 50,
                },
              }}
              component={Link}
              href="/pricing"
            >
              Try premium with 14 days free trial
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
