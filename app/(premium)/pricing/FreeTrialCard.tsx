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
import { grey } from "@mui/material/colors";

export default function FreeTrialCard({ data, handleCardClick }: any) {
  const auth = useSelector((state: any) => state.auth);

  return (
    <>
      <Card
        sx={{
          my: 1,
          mx: 2,
          borderRadius: 1,
          width: 280,
          textAlign: "center",
        }}
        elevation={16}
      >
        <CardContent
          sx={{ p: 0, m: 0, ":hover": { cursor: "pointer" } }}
          onClick={(e) =>
            handleCardClick(e, {
              type: "free_trial",
              product: data.product,
              price: data.currentPrice,
              validity: data.title,
            })
          }
        >
          <Box>
            <Box sx={{ bgcolor: "success.dark" }}>
              <Typography
                gutterBottom
                sx={{
                  color: grey[50],
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  mx: 2,
                  pt: 1.5,
                  pb: 1.5,
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
                    color="text.primary"
                    sx={{
                      fontSize: "1.6rem",
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
                variant="outlined"
                endIcon={<EastRoundedIcon />}
                color="success"
                disabled={auth?.isFreeTrialUsed}
                sx={{
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
    </>
  );
}
