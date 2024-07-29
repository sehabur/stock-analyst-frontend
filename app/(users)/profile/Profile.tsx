"use client";
import React from "react";

import Link from "next/link";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

export default function Profile() {
  const auth = useSelector((state: any) => state.auth);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        {auth && (
          <>
            <Grid item xs={12} sm={3} sx={{}}>
              <Avatar sx={{ width: 80, height: 80, mx: "auto", mt: 2 }} />
            </Grid>
            <Grid item xs={12} sm={9} sx={{ mt: 2 }}>
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: "1.8rem", fontWeight: 500 }}
              >
                {auth.name || "User"}
              </Typography>

              <Box sx={{ my: 4 }}>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Contact information
                </Typography>

                <Typography color="text.primary" sx={{ mt: 1 }}>
                  Email: {auth.email || "No email"}
                </Typography>
                <Typography color="text.primary" sx={{ mt: 1 }}>
                  Phone: {auth.phone || "No phone number"}
                </Typography>
              </Box>
              <Box sx={{ my: 5 }}>
                <Typography sx={{ mb: 2 }} color="text.secondary" gutterBottom>
                  Account type
                </Typography>
                {auth?.isPremium ? (
                  <>
                    <Chip
                      icon={<WorkspacePremiumRoundedIcon />}
                      label="PREMIUM"
                      color="warning"
                      variant="outlined"
                    />
                    <Typography color="text.primary" sx={{ mt: 2 }}>
                      Exipre on:{" "}
                      {DateTime.fromISO(auth?.premiumExpireDate).toFormat(
                        "dd MMM, yyyy"
                      )}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<CheckCircleOutlineRoundedIcon />}
                      label="FREE"
                      color="success"
                      variant="outlined"
                    />
                  </>
                )}
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <Button
                  component={Link}
                  href="/profile/edit"
                  variant="contained"
                  color="primary"
                >
                  Edit profile
                </Button>
                {!auth?.isPremium && (
                  <Button
                    component={Link}
                    href="#"
                    variant="contained"
                    color="warning"
                  >
                    Get Premium
                  </Button>
                )}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
