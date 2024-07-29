import { DateTime } from "luxon";

import { Box, Typography, Avatar, Divider } from "@mui/material";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";

async function getIpo() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/ipo`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Ipo({ searchParams }: any) {
  const { id: ipoId } = searchParams;

  const data = await getIpo();

  const item = data.find((item: any) => item._id == ipoId);

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
              fontSize: { xs: "1.2rem", sm: "1.4rem" },
              fontWeight: 500,
              textAlign: "center",
              my: 2,
            }}
          >
            Upcoming IPO
          </Typography>
          <Box sx={{ color: "text.primary" }}>
            <Typography
              gutterBottom
              sx={{
                color: "primary.main",
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                mx: 2,
                pt: 2,
                pb: 0.6,
              }}
            >
              {item.companyName}
            </Typography>
            <Divider light variant="middle" />

            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
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
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <DoDisturbAltRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Subscription ends at"
                  secondary={`${DateTime.fromISO(item.subscriptionEnd).toFormat(
                    "dd MMM, yyyy"
                  )}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
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
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AddCardRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Max subscription amount"
                  secondary={`${item.maxSubscriptionAmount} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
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
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Min investment required (RB)"
                  secondary={`${item.minInvestmentRB} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Min investment required (NRB)"
                  secondary={`${item.minInvestmentNRB} BDT`}
                />
              </ListItem>
            </Box>
            <Divider light variant="middle" />
            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Record date"
                  secondary={`${item.recordDate}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Face value"
                  secondary={`${item.faceValue} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Premium"
                  secondary={`${item.premium} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Cut off price"
                  secondary={`${item.cutOffPrice} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Discounted price"
                  secondary={`${item.discountedPrice} BDT`}
                />
              </ListItem>
            </Box>
            <Divider light variant="middle" />
            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="NAV (Audited)"
                  secondary={`${item.fundamentals.navAudited}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="NAV (Unaudited)"
                  secondary={`${item.fundamentals.navUnaudited}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="EPS (TTM)"
                  secondary={`${item.fundamentals.epsTtm}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="EPS (5 years average)"
                  secondary={`${item.fundamentals.eps5yrAvg}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="IPO share distribution"
                  secondary={`${item.fundamentals.ipoShareDistribution}`}
                />
              </ListItem>
            </Box>
            <Divider light variant="middle" />
            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <PercentRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Shareholding Percentage"
                  secondary={
                    <Box>
                      <Box>
                        <Typography>
                          Institute:{" "}
                          {item.fundamentals.shareholdingPercentange.institute}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>
                          General:{" "}
                          {item.fundamentals.shareholdingPercentange.general}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>
                          Foreign:{" "}
                          {item.fundamentals.shareholdingPercentange.foreign}%
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
