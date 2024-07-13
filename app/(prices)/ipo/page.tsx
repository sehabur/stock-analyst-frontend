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
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import Link from "next/link";
import { DateTime } from "luxon";

async function getIpo() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/ipo`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Ipo({}) {
  const data = await getIpo();

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: 1250,
          mx: "auto",
          py: 2,
          px: 2,
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: "1.6rem",
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
            {data
              .filter(
                (item: any) => new Date(item.subscriptionEnd) >= new Date()
              )
              .map((item: any, index: number) => (
                <Paper
                  key={index}
                  sx={{
                    my: 2,
                    mx: 2,
                    borderRadius: 3,
                    width: { xs: 320, sm: 350 },
                  }}
                  elevation={6}
                >
                  <Box component={Link} href={`/ipo/details?id=${item._id}`}>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "primary.main",
                        fontSize: { xs: "1.1rem", sm: "1.2rem" },
                        mx: 2,
                        pt: 2,
                        pb: 0.6,
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
                          secondary={`${DateTime.fromISO(
                            item.subscriptionStart
                          ).toFormat("dd MMM, yyyy")}`}
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
                          secondary={`${DateTime.fromISO(
                            item.subscriptionEnd
                          ).toFormat("dd MMM, yyyy")}`}
                        />
                      </ListItem>
                      <ListItem sx={{ pt: 0 }}>
                        <ListItemAvatar>
                          <Avatar>
                            <AddCardRoundedIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Min subscription amount"
                          secondary={`${item.minSubscriptionAmount} BDT`}
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
                          secondary={`${DateTime.fromISO(
                            item.investmentCutoffDate
                          ).toFormat("dd MMM, yyyy")}`}
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
                          secondary={`${item.minInvestmentRB} BDT`}
                        />
                      </ListItem>
                      <Box sx={{ textAlign: "right", mr: 2 }}>
                        <Button
                          variant="text"
                          endIcon={<KeyboardArrowRightOutlinedIcon />}
                          sx={{
                            ":hover": {
                              bgcolor: "transparent",
                            },
                          }}
                        >
                          See Details
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
            {data.filter(
              (item: any) => new Date(item.subscriptionEnd) >= new Date()
            ).length < 1 && (
              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 2,
                  px: 2,
                  bgcolor: "secondaryBackground",
                  maxWidth: 350,
                }}
              >
                <Typography> There is no upcoming IPO to display</Typography>
              </Paper>
            )}
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h1"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: "1.6rem",
              fontWeight: 500,
              textAlign: "center",
              my: 2,
            }}
          >
            Previous IPO
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data
              .filter(
                (item: any) => new Date(item.subscriptionEnd) < new Date()
              )
              .map((item: any, index: number) => (
                <Paper
                  key={index}
                  sx={{
                    my: 2,
                    mx: 2,
                    borderRadius: 3,
                    width: { xs: 320, sm: 350 },
                  }}
                  elevation={6}
                >
                  <Box component={Link} href={`/ipo/details?id=${item._id}`}>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "primary.main",
                        fontSize: { xs: "1.1rem", sm: "1.2rem" },
                        mx: 2,
                        pt: 2,
                        pb: 0.6,
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
                          secondary={`${DateTime.fromISO(
                            item.subscriptionStart
                          ).toFormat("dd MMM, yyyy")}`}
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
                          secondary={`${DateTime.fromISO(
                            item.subscriptionEnd
                          ).toFormat("dd MMM, yyyy")}`}
                        />
                      </ListItem>
                      <ListItem sx={{ pt: 0 }}>
                        <ListItemAvatar>
                          <Avatar>
                            <AddCardRoundedIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Min subscription amount"
                          secondary={`${item.minSubscriptionAmount} BDT`}
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
                          secondary={`${DateTime.fromISO(
                            item.investmentCutoffDate
                          ).toFormat("dd MMM, yyyy")}`}
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
                          secondary={`${item.minInvestmentRB} BDT`}
                        />
                      </ListItem>
                      <Box sx={{ textAlign: "right", mr: 2 }}>
                        <Button
                          variant="text"
                          endIcon={<KeyboardArrowRightOutlinedIcon />}
                          sx={{
                            ":hover": {
                              bgcolor: "transparent",
                            },
                          }}
                        >
                          See Details
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
          </Box>
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
