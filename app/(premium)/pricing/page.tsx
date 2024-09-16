import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

import PricingCard from "./PricingCard";
import FreeTrialCard from "./FreeTrialCard";
import Pricing from "./Pricing";

// const packages = [
//   {
//     title: "1 Month",
//     product: "premium_1month_299",
//     originalPrice: 299,
//     currentPrice: 149,
//     discount: 50,
//     validityDays: 31,
//     isActive: true,
//   },
//   {
//     title: "3 Months",
//     product: "premium_3month_799",
//     originalPrice: 799,
//     currentPrice: 399,
//     discount: 50,
//     validityDays: 92,
//     isActive: true,
//   },
//   {
//     title: "6 Months",
//     product: "premium_6month_1399",
//     originalPrice: 1399,
//     currentPrice: 699,
//     discount: 50,
//     validityDays: 183,
//     isActive: true,
//   },
//   {
//     title: "1 Year",
//     product: "premium_1year_2399",
//     originalPrice: 2399,
//     currentPrice: 1199,
//     discount: 50,
//     validityDays: 365,
//     isActive: true,
//   },
// ];

async function getData() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/payment/packages`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Price() {
  const packages = await getData();

  return (
    <Box component="main" sx={{ bgcolor: "background.default", px: 2 }}>
      <Box
        sx={{
          pt: 3,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mb: 1 }}>
          <WorkspacePremiumRoundedIcon
            sx={{ fontSize: { xs: 45, sm: 50 }, color: "text.secondary" }}
          />
        </Box>
        <Typography
          component="h1"
          color="text.primary"
          sx={{
            fontSize: { xs: "1.6rem", sm: "2rem" },
            fontWeight: 700,
            color: "text.primary",
          }}
          gutterBottom
        >
          Premium Membership
        </Typography>

        <Typography
          color="text.primary"
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Elevate your investing potential with a premium package
        </Typography>
      </Box>

      <Pricing packages={packages} />
      <Box sx={{ maxWidth: 500, mx: "auto", pt: 3, pb: 6 }}>
        <Typography
          component="h1"
          color="text.primary"
          sx={{
            fontSize: { xs: "1.7rem", sm: "2rem" },
            fontWeight: 700,
            color: "text.primary",
            mb: 2,
            ml: 2,
          }}
        >
          What you will get ?
        </Typography>

        <Box>
          <ListItem
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "1.2rem",
                color: "text.primary",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <DoneAllRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="No Advertisement"
              secondary="Get advertisement free smooth experience"
            />
          </ListItem>
          <ListItem
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "1.2rem",
                color: "text.primary",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <DoneAllRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Full Access"
              secondary="Full access to all our premium features"
            />
          </ListItem>
        </Box>
      </Box>
    </Box>
  );
}
