"use client";
import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";

import { Paper, Box, Typography, Button, Avatar } from "@mui/material";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function Ipo(props: any) {
  const { data } = props;

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/ipo/details?id=${id}`);
  };

  return (
    <Box sx={{ my: 6, ml: { xs: 1.5, sm: 8 }, mr: { xs: 1.5, sm: 0 } }}>
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
        {data
          .filter((item: any) => new Date(item.subscriptionEnd) >= new Date())
          .map((item: any, index: number) => (
            <Paper
              sx={{
                width: "100%",
                mt: 2,
                mb: { xs: 2, sm: 3 },
                pt: { xs: 1.4, sm: 2.5 },
                pb: { xs: 1, sm: 1 },
                px: { xs: 0, sm: 1.5 },
                borderRadius: 2,
                ":hover": {
                  bgcolor: "secondaryBackground",
                  cursor: "pointer",
                },
                mr: { xs: 0, sm: 4 },
              }}
              onClick={() => handleClick(item._id)}
              elevation={6}
              key={index}
            >
              <Typography
                noWrap
                sx={{
                  color: "primary.main",
                  fontSize: "1.2rem",
                  mx: 2,
                  mb: 1,
                  mt: { xs: 1, sm: 0 },
                }}
              >
                {item.companyName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ListItem sx={{ pt: 0, width: { xs: 180, sm: 210 } }}>
                  <ListItemAvatar>
                    <Avatar>
                      <PlayCircleOutlineRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Starts from"
                    secondary={`${DateTime.fromISO(
                      item.subscriptionStart
                    ).toFormat("dd MMM, yyyy")}`}
                  />
                </ListItem>
                <ListItem sx={{ pt: 0, width: { xs: 180, sm: 210 } }}>
                  <ListItemAvatar>
                    <Avatar>
                      <DoDisturbAltRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Ends at"
                    secondary={`${DateTime.fromISO(
                      item.subscriptionStart
                    ).toFormat("dd MMM, yyyy")}`}
                  />
                </ListItem>
                <ListItem sx={{ pt: 0, width: { xs: 180, sm: 210 } }}>
                  <ListItemAvatar>
                    <Avatar>
                      <AddCardRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Min amount"
                    secondary={`${item.minSubscriptionAmount} BDT`}
                  />
                </ListItem>
                <ListItem sx={{ pt: 0, width: { xs: 180, sm: 210 } }}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountBalanceRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Min invest"
                    secondary={`${item.minInvestmentRB} BDT`}
                  />
                </ListItem>
              </Box>
              <Box sx={{ textAlign: "left", ml: 1.3 }}>
                <Button
                  variant="text"
                  disableRipple
                  endIcon={<KeyboardArrowRightOutlinedIcon />}
                  sx={{
                    ":hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  See details
                </Button>
              </Box>
            </Paper>
          ))}
        {data.filter(
          (item: any) => new Date(item.subscriptionEnd) >= new Date()
        ).length < 1 && (
          <Box
            sx={{
              my: 2,
              px: 1,
            }}
          >
            <Typography sx={{ color: "text.primary" }}>
              There is no upcoming IPO to display.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
