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
import { Divider } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="https://mui.com/">Stocksupporter</Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
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
              <SitemarkIcon />
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
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
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
              Terms
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: { xs: 3, sm: 4 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <div>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2" href="/terms">
              Terms of Service
            </Link>
            <Box sx={{ display: { xs: "block", sm: "none" }, mt: 0.8 }}>
              <Link color="text.secondary" variant="body2" href="/aboutus">
                About us
              </Link>
            </Box>
            <Copyright />
          </div>
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
