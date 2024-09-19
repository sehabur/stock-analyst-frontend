"use client";
import React from "react";

import Link from "next/link";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useSelector } from "react-redux";

export default function FreeTrialCard({ data, handleCardClick }: any) {
  const auth = useSelector((state: any) => state.auth);

  return (
    <>
      <Card
        sx={{
          my: 2,
          mx: 2,
          borderRadius: 2,
          width: 280,
          textAlign: "center",
        }}
        elevation={6}
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
                {data.title}
              </Typography>
            </Box>

            <Box sx={{ my: 4 }}>
              {auth?.isFreeTrialUsed ? (
                <Box sx={{ px: 6, py: 1 }}>
                  <Typography
                    sx={{ fontSize: "1.4rem", color: "text.secondary" }}
                  >
                    Free trial already used for this user
                  </Typography>
                </Box>
              ) : (
                <>
                  <Typography
                    color="success.main"
                    sx={{
                      fontSize: "1.8rem",
                    }}
                  >
                    Free Trial
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="baseline"
                    justifyContent="center"
                  >
                    <Typography
                      color="text.primary"
                      sx={{ fontSize: "1.6rem" }}
                    >
                      {data.currentPrice}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "1rem", ml: 1 }}
                    >
                      BDT
                    </Typography>
                  </Stack>
                </>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                endIcon={<EastRoundedIcon />}
                color="success"
                disabled={auth?.isFreeTrialUsed}
                sx={{
                  borderRadius: 8,
                  fontSize: "1rem",
                  px: 3,
                  py: 1,
                }}
                onClick={(e) =>
                  handleCardClick(e, {
                    type: "free_trial",
                    product: data.product,
                    price: data.currentPrice,
                    validity: data.title,
                  })
                }
              >
                Subscribe now
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
