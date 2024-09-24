import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";
import StackedBarChartRoundedIcon from "@mui/icons-material/StackedBarChartRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";

import PricingCard from "./PricingCard";
import FreeTrialCard from "./FreeTrialCard";
import Pricing from "./Pricing";
import PremiumFeatureCard from "@/components/cards/PremiumFeatureCard";
import { Grid } from "@mui/material";

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

const features = [
  {
    icon: <DoNotDisturbAltOutlinedIcon />,
    title: "No Advertisement",
    description: "No buzzing advertisements while you are working",
    color: "#e74c3c",
  },
  {
    icon: <AccountBalanceRoundedIcon />,
    title: "Fundamental Analysis",
    description: "Fundamental data analysis and visualization for all stocks",
    color: "#1abc9c",
  },
  {
    icon: <StackedBarChartRoundedIcon />,
    title: "Technical Analysis",
    description: "Better insight with tailored technical analysis",
    color: "#3498db",
  },
  {
    icon: <FilterAltOutlinedIcon />,
    title: "Advanced Screener",
    description: "Stay ahead with our advanced screener having 65+ filters",
    color: "#27ae60",
  },
  {
    icon: <TuneRoundedIcon />,
    title: "Custom Indicators",
    description: "Custom made indicators to make your analysis easier",
    color: "#9b59b6",
  },
  {
    icon: <AlarmOutlinedIcon />,
    title: "Price Alerts",
    description: "Unlimited price alerts to keep you updated",
    color: "#f39c12",
  },
];

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
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box sx={{ px: 2, pb: 4 }}>
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
              sx={{ fontSize: { xs: 40, sm: 40 }, color: "#2575fc" }}
            />
          </Box>
          <Typography
            component="h1"
            color="text.primary"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem" },
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
      </Box>
      <Box sx={{ bgcolor: "homepageBackground", pt: 4, pb: 4 }}>
        <Box
          sx={{
            maxWidth: 1000,
            mx: "auto",
            pb: 6,
            bgcolor: "homepageBackground",
          }}
        >
          <Typography
            color="text.primary"
            sx={{
              fontSize: { xs: "1.6rem", sm: "1.8rem" },
              fontWeight: 500,
              color: "text.primary",
              mb: 3,
              mt: 3,
              textAlign: "center",
            }}
          >
            Our Premium Features
          </Typography>
          <Box sx={{ px: 2 }}>
            <Grid container spacing={3}>
              {features.map((item: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <PremiumFeatureCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* <Typography
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
        </Typography> */}

          {/* <Box>
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
        </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
