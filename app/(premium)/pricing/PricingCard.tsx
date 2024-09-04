import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";

import EastRoundedIcon from "@mui/icons-material/EastRounded";

export default function PricingCard({ data, type }: any) {
  return (
    <Card
      sx={{
        my: 2,
        mx: 2,
        borderRadius: 3,
        width: { xs: 320, sm: 350 },
        textAlign: "center",
      }}
      elevation={6}
    >
      <CardContent sx={{ p: 0 }}>
        {/* <Box component={Link} href="/verify-phone?type=premium_package"> */}
        <Box component={Link} href="/checkout">
          <Box sx={{ bgcolor: "warning.dark" }}>
            <Typography
              gutterBottom
              sx={{
                color: "#ffffff",
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                mx: 2,
                pt: 1.2,
                pb: 1,
              }}
            >
              {data?.title}
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="center"
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.6rem",
                  textDecoration: "line-through red 3px",
                }}
              >
                {data?.price}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: "1rem", ml: 1 }}
              >
                BDT
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="center"
            >
              <Typography color="text.primary" sx={{ fontSize: "1.6rem" }}>
                {data?.discountedPrice}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: "1rem", ml: 1 }}
              >
                BDT
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1rem" }}>
              Now at {data?.discount}% discount{" "}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              endIcon={<EastRoundedIcon />}
              color="warning"
              sx={{
                borderRadius: 8,
                ":hover": {
                  bgcolor: "transparent",
                },
                fontSize: "1rem",
                px: 3,
              }}
            >
              Subscribe now
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
