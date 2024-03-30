"use client";
import { Paper, Box, Typography, Stack, Button, Avatar } from "@mui/material";
import React from "react";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Link from "next/link";

import { useRouter } from "next/navigation";

const data: any = [
  {
    _id: 1,
    companyName: "Asiatic Laboratories Limited",
    subscriptionStart: "February 04, 2024",
    subscriptionEnd: "February 08, 2024",
    subscriptionAmount: "10,010",
    investmentCutoffDate: "January 25, 2024",
    minInvestment: "50,000",
  },
  {
    _id: 2,
    companyName: "Asiatic Laboratories Limited",
    subscriptionStart: "February 04, 2024",
    subscriptionEnd: "February 08, 2024",
    subscriptionAmount: "10,010",
    investmentCutoffDate: "January 25, 2024",
    minInvestment: "50,000",
  },
  {
    _id: 3,
    companyName: "Asiatic Laboratories Limited siatic Laboratories Limited",
    subscriptionStart: "February 04, 2024",
    subscriptionEnd: "February 08, 2024",
    subscriptionAmount: "10,010",
    investmentCutoffDate: "January 25, 2024",
    minInvestment: "50,000",
  },
];
export default function Ipo() {
  const router = useRouter();

  const handleClick = (index: number) => {
    console.log(index);
    router.push(`/ipo#${index}`);
  };
  return (
    <Box sx={{ my: 4 }}>
      <Button
        component={Link}
        href="/ipo"
        color="primary"
        endIcon={<ArrowForwardIosRoundedIcon />}
        sx={{
          fontSize: "1.5rem",
          fontWeight: 700,
          ":hover": {
            bgcolor: "transparent",
            color: "primary.main",
            textDecoration: "underline",
          },
        }}
      >
        Upcoming IPO
      </Button>

      <Box>
        {data.map((item: any, index: number) => (
          <Paper
            sx={{
              my: 2,
              pt: 1.4,
              borderRadius: 2,
              ":hover": {
                bgcolor: "secondaryBackground",
                cursor: "pointer",
              },
              maxWidth: 420,
            }}
            onClick={() => handleClick(index)}
            elevation={6}
            key={index}
          >
            <Typography
              noWrap
              sx={{ color: "text.primary", fontSize: "1.1rem", mx: 2 }}
            >
              {item.companyName}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItem sx={{ pt: 0 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AddCardRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Starts from"
                  secondary={`${item.subscriptionStart}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AddCardRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Amount"
                  secondary={`${item.subscriptionAmount} BDT`}
                />
              </ListItem>

              {/* <Stack direction="row" alignItems="center" spacing={1}>
                <AddCardRoundedIcon
                  color="warning"
                  sx={{ fontSize: "1.2rem" }}
                />
                <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                  Subscription amount: {item.subscriptionAmount} BDT
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <EventNoteRoundedIcon
                  color="success"
                  sx={{ fontSize: "1.2rem" }}
                />
                <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                  Starts from {item.subscriptionStart}{" "}
                </Typography>
              </Stack> */}
            </Box>
          </Paper>
        ))}
        {data.length < 1 && (
          <Paper
            elevation={0}
            sx={{
              my: 2,
              py: 2,
              px: 2,
              bgcolor: "secondaryBackground",
              width: 400,
            }}
          >
            <Typography> There is no upcoming IPO to display.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
