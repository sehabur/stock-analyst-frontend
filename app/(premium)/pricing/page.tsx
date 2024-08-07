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

const packages = [
  {
    title: "1 Month",
    price: 299,
    discountedPrice: 149,
    discount: 50,
  },
  {
    title: "3 Months",
    price: 799,
    discountedPrice: 399,
    discount: 50,
  },
  {
    title: "6 Months",
    price: 1399,
    discountedPrice: 699,
    discount: 50,
  },
  {
    title: "1 Year",
    price: 2399,
    discountedPrice: 1199,
    discount: 50,
  },
];

export default function Price() {
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
        <Box>
          <WorkspacePremiumRoundedIcon
            sx={{ fontSize: { xs: 40, sm: 50 } }}
            color="warning"
          />
        </Box>
        <Typography
          component="h1"
          color="text.primary"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2rem" },
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.1,
          }}
          gutterBottom
        >
          Premium membership
        </Typography>

        <Typography
          color="text.primary"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Elevate your investing potential with a premium package
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          pb: 4,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <FreeTrialCard />
        {packages.map((item: any, index: number) => (
          <PricingCard data={item} key={index} />
        ))}
      </Box>
      <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", py: 6 }}>
        <Typography
          component="h1"
          color="text.primary"
          sx={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "text.primary",
            mb: 3,
          }}
        >
          What you will get
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
