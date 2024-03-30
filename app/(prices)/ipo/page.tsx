import {
  Paper,
  Box,
  Typography,
  Stack,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import React from "react";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";

import Link from "next/link";

const getIpos = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/ipo`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

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
    companyName: "Asiatic Laboratories Limited Limited  Limited ",
    subscriptionStart: "February 04, 2024",
    subscriptionEnd: "February 08, 2024",
    subscriptionAmount: "10,010",
    investmentCutoffDate: "January 25, 2024",
    minInvestment: "50,000",
  },
];
export default async function Ipo() {
  // const data = await getIpos();
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: 1080,
          mx: "auto",
          py: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: "1.7rem",
            fontWeight: 500,
            textAlign: "center",
            my: 2,
          }}
        >
          Upcoming IPO
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.map((item: any, index: number) => (
            <div id={index.toString()} key={index}>
              <Paper
                sx={{
                  my: 2,
                  mx: 2,
                  borderRadius: 3,
                  width: { xs: 320, sm: 350 },
                }}
                elevation={6}
              >
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    fontSize: "1.3rem",
                    mx: 2,
                    pt: 1.4,
                  }}
                >
                  {item.companyName}
                </Typography>
                <Divider />

                <Box sx={{ py: 1 }}>
                  <ListItem sx={{ pt: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <PlayCircleOutlineRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Subscription starts from"
                      secondary={`${item.subscriptionStart}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pt: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <DoDisturbAltRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Subscription ends at"
                      secondary={`${item.subscriptionEnd} BDT`}
                    />
                  </ListItem>
                  <ListItem sx={{ pt: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <AddCardRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Subscription amount"
                      secondary={`${item.subscriptionAmount} BDT`}
                    />
                  </ListItem>
                  <ListItem sx={{ pt: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <DoDisturbAltRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cut-off date for investment"
                      secondary={`${item.investmentCutoffDate} BDT`}
                    />
                  </ListItem>
                  <ListItem sx={{ pt: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountBalanceRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Min investment required"
                      secondary={`${item.minInvestment} BDT`}
                    />
                  </ListItem>
                </Box>
              </Paper>
            </div>
          ))}
        </Box>
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
