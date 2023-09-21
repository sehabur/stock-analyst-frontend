'use client';
import { useState } from 'react';
import { Box, Grid, Typography, Chip, Stack, Tab, Tabs } from '@mui/material';
import Overview from './Overview';
import Financials from './Fiancials';

const tabItems = [
  {
    title: 'Overview',
    component: <Overview />,
  },
  {
    title: 'Financials',
    component: <Financials />,
  },
  {
    title: 'Overview',
    component: <Overview />,
  },
  {
    title: 'Financials',
    component: <Financials />,
  },
  {
    title: 'Overview',
    component: <Overview />,
  },
  {
    title: 'Financials',
    component: <Financials />,
  },
  {
    title: 'Overview',
    component: <Overview />,
  },
  {
    title: 'Financials',
    component: <Financials />,
  },
  {
    title: 'Overview',
    component: <Overview />,
  },
];

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
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </Box>
  );
};

export default function TabView() {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="visible arrows tabs example"
          onChange={handleChange}
          sx={{ ml: { xs: 0, sm: 8 } }}
        >
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              label={item.title}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                px: 0,
                mx: { xs: 0, sm: 1.2 },
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
    </>
  );
}
