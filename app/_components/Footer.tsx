"use client";
import * as React from "react";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Divider, useTheme } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary">
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
          pb: { xs: 4, sm: 4 },
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
              <Box sx={{ mt: 2 }}>
                <img
                  src="/images/ssl-footer.jpg"
                  style={{
                    width: "auto",
                    height: "60px",
                    marginLeft: "-4px",
                    borderRadius: "5px",
                  }}
                  alt="logo of stocksupporter"
                />
              </Box>
              <Box>
                <Typography color="text.secondary">
                  Charts are powered by{" "}
                  <Typography
                    component={Link}
                    href="https://www.tradingview.com/"
                    target="_blank"
                    sx={{ color: "primary.main" }}
                  >
                    TradingView
                  </Typography>
                </Typography>
              </Box>
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
            {/* <Link color="text.secondary" variant="body2" href="/contactus">
              Contact us
            </Link> */}
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
              Terms and Conditions
            </Link>
            <Link color="text.secondary" variant="body2" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link color="text.secondary" variant="body2" href="/refund-policy">
              Refund Policy
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 3,
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: { xs: "block", sm: "none" }, mt: 0.8 }}>
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
              <Link
                color="text.secondary"
                variant="body2"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Typography
                display="inline"
                sx={{ mx: 0.5, opacity: 0.5 }}
                color="text.secondary"
              >
                &nbsp;•&nbsp;
              </Typography>
              <Link color="text.secondary" variant="body2" href="/terms">
                Terms and Conditions
              </Link>
              <Typography
                display="inline"
                sx={{ mx: 0.5, opacity: 0.5 }}
                color="text.secondary"
              >
                &nbsp;•&nbsp;
              </Typography>
              <Link
                color="text.secondary"
                variant="body2"
                href="/refund-policy"
              >
                Refund Policy
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
            alignItems="center"
            spacing={1}
            useFlexGap
            sx={{
              color: "text.secondary",
            }}
          >
            <IconButton
              color="primary"
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61566267416444"
              aria-label="GitHub"
              sx={{ alignSelf: "center" }}
            >
              <FacebookRoundedIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
            <IconButton
              color="error"
              target="_blank"
              href="https://www.youtube.com/@Stocksupporter-x8l"
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
