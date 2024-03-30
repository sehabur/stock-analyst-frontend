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
          px: 3,
          py: 1.5,
          borderRadius: 2,
          ":hover": {
            bgcolor: "financeCardTitlecolor",
          },
          bgcolor: "gainerCard",
        }}
        elevation={0}
        // variant="outlined"
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={7}>
            <Typography
              gutterBottom
              noWrap
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              {item.companyName}
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mb: 0.5 }}>
              <Chip
                label={item.tradingCode}
                variant="outlined"
                color="info"
                size="small"
                sx={{
                  borderRadius: 1,
                  mr: 2,
                  fontWeight: 700,
                  fontSize: ".9rem",
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={2.8}>
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="flex-end"
              sx={{ mr: 0.7 }}
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 500,
                  // color:
                  //   item.change === 0
                  //     ? "primary.main"
                  //     : item.change < 0
                  //     ? "error.main"
                  //     : "success.main",
                }}
              >
                {item.ltp}
              </Typography>
              <Typography
                sx={{ fontSize: "1rem", ml: 0.5 }}
                color="text.secondary"
              >
                BDT
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2.2}>
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
                  fontSize: "1rem",
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
                    fontSize: ".95rem",
                  }}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
