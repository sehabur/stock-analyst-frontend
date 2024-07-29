"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Get started now",
    buttonVariant: "outlined",
    color: "success.main",
  },
  {
    title: "Premium",
    subheader: "Recommended",
    price: "150",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
      "Dedicated team",
      "Best deals",
    ],
    buttonText: "Start 14 days free trial",
    buttonVariant: "contained",
    color: "warning.main",
  },
];

export default function Pricing() {
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 4, sm: 8 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          color="text.primary"
          sx={{ fontSize: "2.4rem", mb: 2 }}
        >
          Pricing
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
          Get start for absolutely free or migrate to premium to avail all
          features. 14 days trial available.
        </Typography>
      </Box>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={6} md={4}>
            <Card
              elevation={6}
              sx={(theme) => ({
                borderRadius: 3,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                ...(tier.title === "Professional" && {
                  border: "none",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? `0 8px 12px hsla(210, 98%, 42%, 0.2)`
                      : `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                  background:
                    "radial-gradient(circle at 50% 0%, hsl(210, 98%, 35%), hsl(210, 100%, 16%))",
                }),
              })}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography component="h3" variant="h6" color={tier.color}>
                    {tier.title}
                  </Typography>
                  {tier.title === "Premium" && (
                    <Chip
                      icon={<AutoAwesomeIcon color="primary" />}
                      label={tier.subheader}
                      size="small"
                      sx={{ px: 0.7, py: 1.8 }}
                    />
                  )}
                </Box>
                <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
                  Starts from
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    color:
                      tier.title === "Professional" ? "grey.50" : undefined,
                  }}
                >
                  <Typography component="h3" variant="h4">
                    {tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; BDT per month
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.8,
                    borderColor: "divider",
                  }}
                />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleOutlineRoundedIcon
                      sx={{
                        width: 20,
                        color: tier.color,
                      }}
                    />
                    <Typography variant="subtitle2" component={"span"}>
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant as "outlined" | "contained"}
                  component="a"
                  href="/material-ui/getting-started/templates/checkout/"
                  target="_blank"
                  color="primary"
                  sx={{ py: 1 }}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
