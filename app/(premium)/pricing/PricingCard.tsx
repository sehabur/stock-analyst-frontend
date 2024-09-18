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

export default function PricingCard({ data, handleCardClick }: any) {
  const { currentPrice, originalPrice, title, discount, product } = data;

  return (
    <Card
      sx={{
        my: 2,
        mx: 2,
        borderRadius: 2,
        width: 300,
        textAlign: "center",
      }}
      elevation={8}
    >
      <CardContent sx={{ p: 0 }}>
        <Box>
          <Box sx={{ bgcolor: "overviewHeader" }}>
            <Typography
              gutterBottom
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.1rem", sm: "1.4rem" },
                mx: 2,
                pt: 1.4,
                pb: 1.4,
              }}
            >
              {title}
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
                {originalPrice}
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
                {currentPrice}
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
              Now at {discount}% discount{" "}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              endIcon={<EastRoundedIcon />}
              color="primary"
              sx={{
                borderRadius: 8,
                fontSize: "1rem",
                px: 3,
                py: 1,
              }}
              onClick={(e) =>
                handleCardClick(e, {
                  type: "premium_package",
                  product,
                  price: currentPrice,
                  validity: title,
                })
              }
            >
              Subscribe now
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
