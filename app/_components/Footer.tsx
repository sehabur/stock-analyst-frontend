"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";

import SitemarkIcon from "./SitemarkIcon";
import { Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary" mt={1}>
      {"Copyright © "}
      <Box component="span" sx={{ fontWeight: 700 }}>
        Stocksupporter
      </Box>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const theme: any = useTheme();

  const themeColor = useSelector((state: any) => state.themeColor);

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Divider />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 4 },
          pt: { xs: 3, sm: 5 },
          pb: { xs: 4, sm: 5 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Box>
                <img
                  src={
                    themeColor === "dark"
                      ? "/images/logo/logo-full-dark.png"
                      : "/images/logo/logo-full-light.png"
                  }
                  style={{
                    width: "auto",
                    height: "35px",
                    marginLeft: "-4px",
                  }}
                  alt="logo of stocksupporter"
                />
              </Box>
              <Typography
                fontWeight={700}
                sx={{ mt: 2, mb: 1, fontSize: "1.1rem" }}
                color="text.primary"
              >
                Contact us
              </Typography>
              <Typography mb={0.5} color="text.primary">
                Hotline: 01311086137
              </Typography>
              <Typography color="text.primary">
                Email: support@stocksupporter.com
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.primary"
            >
              Product
            </Typography>
            <Link color="text.secondary" variant="body2" href="/market-today">
              Market today
            </Link>
            <Link color="text.secondary" variant="body2" href="screener">
              Screener
            </Link>
            <Link color="text.secondary" variant="body2" href="supercharts">
              Supercharts
            </Link>
            <Link color="text.secondary" variant="body2" href="gainer-loser">
              Top shares
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.primary"
            >
              Company
            </Typography>
            <Link color="text.secondary" variant="body2" href="/aboutus">
              About us
            </Link>
            <Link color="text.secondary" variant="body2" href="/faq">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.primary"
            >
              Legal
            </Typography>
            <Link color="text.secondary" variant="body2" href="/terms">
              Terms of service
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy policy
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 3,
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: { xs: "block", sm: "none" }, mt: 0.8 }}>
              <Link color="text.secondary" variant="body2" href="#">
                Privacy Policy
              </Link>
              <Typography
                display="inline"
                sx={{ mx: 0.5, opacity: 0.5 }}
                color="text.secondary"
              >
                &nbsp;•&nbsp;
              </Typography>
              <Link color="text.secondary" variant="body2" href="/aboutus">
                About us
              </Link>
              <Typography
                display="inline"
                sx={{ mx: 0.5, opacity: 0.5 }}
                color="text.secondary"
              >
                &nbsp;•&nbsp;
              </Typography>
              <Link color="text.secondary" variant="body2" href="/terms">
                Terms of Service
              </Link>
              <Typography
                display="inline"
                sx={{ mx: 0.5, opacity: 0.5 }}
                color="text.secondary"
              >
                &nbsp;•&nbsp;
              </Typography>
              <Link color="text.secondary" variant="body2" href="/faq">
                FAQs
              </Link>
            </Box>
            <Copyright />
          </Box>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: "text.secondary",
            }}
          >
            <IconButton
              color="primary"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: "center" }}
            >
              <FacebookRoundedIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
            <IconButton
              color="error"
              href="https://twitter.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: "center" }}
            >
              <YouTubeIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
