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
    <Box
      sx={{
        maxWidth: 475,
        px: 3,
        pb: 6,
        mt: { xs: 2, sm: 4 },
        mx: "auto",
        bgcolor: "secondaryBackground",
        borderRadius: 3,
      }}
    >
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {auth && (
          <>
            <Grid item xs={12} sm={3}>
              <Avatar sx={{ width: 80, height: 80, mt: 2 }} />
            </Grid>
            <Grid item xs={12} sm={9} sx={{ mt: 2 }}>
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: "1.8rem", fontWeight: 500 }}
              >
                {auth.name || "User"}
              </Typography>

              <Divider light sx={{ my: 2 }} />

              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography
                  color="text.secondary"
                  sx={{ mb: 2, fontSize: "1.1rem" }}
                >
                  Contact information
                </Typography>

                <Typography color="text.primary" sx={{ mt: 1 }}>
                  Email: {auth.email || "No email"}
                </Typography>
                <Typography color="text.primary" sx={{ mt: 1 }}>
                  Phone: {auth.phone || "No phone number"}
                </Typography>
              </Box>

              <Divider light sx={{ my: 2 }} />

              <Box sx={{ mt: 2, mb: 5 }}>
                <Typography
                  sx={{ mb: 2, fontSize: "1.1rem" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Account type
                </Typography>
                {auth?.isPremiumEligible ? (
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

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Button
                  component={Link}
                  href="/profile/edit"
                  variant="outlined"
                  color="primary"
                >
                  Edit profile
                </Button>
                {!auth?.isPremiumEligible && (
                  <Button
                    component={Link}
                    href="/pricing"
                    variant="contained"
                    color="primary"
                  >
                    Get Premium
                  </Button>
                )}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
