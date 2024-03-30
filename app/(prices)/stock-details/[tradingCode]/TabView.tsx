"use client";
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Overview from "./Overview";
import Financials from "./Fiancials";
import MarketDepth from "./MarketDepth";
import BlockTransections from "./BlockTransections";
import News from "./News";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export default function TabView(props: any) {
  const { stock, news, blocktr } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const tabItems = [
    {
      title: "Overview",
      component: <Overview stock={stock} />,
    },
    {
      title: "Fundamentals",
      component: <Financials data={stock.fundamentals} />,
    },
    {
      title: "Market depth",
      component: <MarketDepth />,
    },
    {
      title: matchesSmUp ? "Block transections" : "Block tr",
      component: <BlockTransections blocktr={blocktr} />,
    },
    {
      title: "News",
      component: <News news={news} />,
    },
    {
      title: "Technicals",
      component: <News />,
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          sx={{ mx: { xs: 1, sm: "auto" }, maxWidth: 1250 }}
        >
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              label={item.title}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: "text.primary",
                px: 1,
                mx: { xs: 0.2, sm: 2 },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabItems.map((item, index) => (
        <TabPanel value={value} index={index} key={index}>
          {item.component}
        </TabPanel>
      ))}
    </Box>
  );
}
