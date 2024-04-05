"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Stack,
  Chip,
  Paper,
  DialogTitle,
  InputBase,
} from "@mui/material";

import { grey, blueGrey } from "@mui/material/colors";

import Link from "next/link";

const addPlusSign = (value: number) => {
  let result;
  if (value > 0) {
    result = "+" + value.toFixed(2);
  } else if (value < 0) {
    result = value.toFixed(2);
  } else {
    result = value;
  }
  return result;
};

export default function GainerCard(props: any) {
  const { item } = props;
  return (
    <Box component={Link} href={`/stock-details/${item.tradingCode}`}>
      <Paper
        sx={{
          my: 1,
          px: { xs: 1, sm: 3 },
          py: 1.5,
          borderRadius: { xs: 0, sm: 2 },
          ":hover": {
            bgcolor: "financeCardTitlecolor",
          },
          bgcolor: "gainerCard",
        }}
        elevation={0}
        // variant="outlined"
      >
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={8}>
            <Typography
              noWrap
              gutterBottom
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                color: { xs: "primary.main", sm: "text.primary" },
              }}
            >
              {item.companyName}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ mb: 0.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}
            >
              <Chip
                label={item.tradingCode}
                variant="outlined"
                color="info"
                size="small"
                sx={{
                  borderRadius: 1,
                  // fontWeight: 700,
                  fontSize: ".9rem",
                  mr: 1,
                  mb: 0.5,
                }}
              />
              <Chip
                label={item.sector}
                // variant="outlined"
                // color="info"
                size="small"
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  // fontWeight: 700,
                  fontSize: ".9rem",
                }}
              />
            </Stack>
            <Typography
              sx={{ fontSize: ".875rem", ml: 0.3 }}
              color="text.primary"
            >
              Vol: {item.volume} | Val: {(item.value / 10).toFixed(2)}cr | Trd:{" "}
              {item.trade}
            </Typography>
          </Grid>

          <Grid item xs={4} sm={4}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={{ xs: 2, sm: 3.5 }}
            >
              <Stack direction="column" alignItems="flex-end" sx={{ mr: 0.7 }}>
                <Typography
                  color="text.primary"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "1.3rem" },
                    fontWeight: 500,
                  }}
                >
                  {item.ltp}
                </Typography>
                <Typography sx={{ fontSize: ".875rem" }} color="text.secondary">
                  BDT
                </Typography>
              </Stack>
              <Stack direction="column" alignItems="flex-end">
                <Typography
                  gutterBottom
                  sx={{
                    mr: 1,
                    color:
                      item.change === 0
                        ? "primary.main"
                        : item.change < 0
                        ? "error.main"
                        : "success.main",
                    fontWeight: 700,
                    fontSize: ".95rem",
                  }}
                >
                  {addPlusSign(item.change)}
                </Typography>

                {item.change !== 0 && (
                  <Chip
                    label={`${addPlusSign(item.percentChange)}%`}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      color: grey[50],
                      bgcolor:
                        item.change === 0
                          ? "primary.main"
                          : item.change < 0
                          ? "error.main"
                          : "success.main",
                      fontWeight: 500,
                      fontSize: ".9rem",
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
