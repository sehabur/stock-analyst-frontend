import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";
import StackedBarChartRoundedIcon from "@mui/icons-material/StackedBarChartRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import { Avatar } from "@mui/material";

const items = [
  {
    icon: <TroubleshootRoundedIcon />,
    title: "Market Insight",
    description:
      "Today's market insight and overall scenario for your best understanding",
  },
  {
    icon: <AccountBalanceRoundedIcon />,
    title: "Fundamental Analysis",
    description: "Fundamental data analysis and visualization for all stocks",
  },
  {
    icon: <StackedBarChartRoundedIcon />,
    title: "Technical Analysis",
    description: "Better insight with tailored technical analysis",
  },
  {
    icon: <TuneRoundedIcon />,
    title: "Advanced screener",
    description:
      "Stay ahead with our advanced screener feature to find out the best share to trade.",
  },
  {
    icon: <StackedBarChartRoundedIcon />,
    title: "Supercharts",
    description:
      "Supercharts powered by trading view with all required indicators and features.",
  },
  {
    icon: <TuneRoundedIcon />,
    title: "Custom Indicators",
    description: "Custom made indicators to make your analysis easier",
  },
  {
    icon: <DonutSmallRoundedIcon />,
    title: "Sector Dashboard",
    description: "Sector wise share analysis. Data and charts for sectors.",
  },
  {
    icon: <AlarmOutlinedIcon />,
    title: "Price Alerts",
    description:
      "Customized price alerts for stocks to always keep you updated",
  },
  {
    icon: <ExtensionRoundedIcon />,
    title: "User Portfolio",
    description:
      "Create portfolio, favorite shares, get news alerts for your favorite stocks and more..",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 4, sm: 4 },
        mb: 6,
        borderRadius: 1,
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
            mb: 6,
          }}
        >
          <Typography
            component="h2"
            gutterBottom
            sx={{ color: "text.primary", fontSize: "1.8rem", fontWeight: 500 }}
          >
            Our Features
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "hsla(220, 25%, 25%, .3)",
                  // background:
                  //   "linear-gradient(135deg, #3a6fff, #5381ff, #8fb6ff)",
                  // backgroundColor: "grey.900",
                  boxShadow: "none",
                  borderRadius: 3,
                }}
              >
                <Avatar
                  sx={{
                    // color: "info.light",
                    // bgcolor: "grey.800",
                    borderRadius: 3,
                  }}
                >
                  {item.icon}
                </Avatar>
                <div>
                  <Typography
                    fontWeight="medium"
                    gutterBottom
                    sx={{ fontSize: "1.1rem", color: "text.primary" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
