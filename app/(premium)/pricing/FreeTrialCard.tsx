"use client";
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
import { useSelector } from "react-redux";

export default function FreeTrialCard() {
  const auth = useSelector((state: any) => state.auth);

  return (
    <Card
      sx={{
        my: 2,
        mx: 2,
        borderRadius: 3,
        width: { xs: 320, sm: 320 },
        textAlign: "center",
      }}
      elevation={6}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          component={Link}
          href={auth?.isFreeTrialUsed ? "#" : "/verify-phone?type=free_trial"}
        >
          <Box sx={{ bgcolor: "success.main" }}>
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
              14 Days
            </Typography>
          </Box>

          <Box sx={{ my: 3.5 }}>
            {auth?.isFreeTrialUsed ? (
              <Box sx={{ px: 6 }}>
                <Typography
                  sx={{ fontSize: "1.5rem", color: "text.secondary" }}
                >
                  Free trial already used for this user
                </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  color="text.primary"
                  sx={{
                    fontSize: "1.8rem",
                  }}
                >
                  Free
                </Typography>
                <Typography
                  color="text.primary"
                  sx={{
                    fontSize: "1.8rem",
                  }}
                >
                  Trial
                </Typography>
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
