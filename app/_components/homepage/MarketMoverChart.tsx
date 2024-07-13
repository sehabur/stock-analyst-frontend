"use client";
import PieChart from "@/components/charts/PieChart";
import {
  Paper,
  Grid,
  Typography,
  Stack,
  Button,
  Chip,
  useTheme,
  Box,
  Popover,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import useMediaQuery from "@mui/material/useMediaQuery";

const colors = ["#24b29b", "#448aff", "#f45e6a"];
const labels = ["Uptrend", "Neutral", "Downtrend"];

export default function MarketMoverChart({ data, sectorData }: any) {
  const theme: any = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [type, setType] = useState<any>("uptrendItems");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    setAnchorEl(event.currentTarget);
    setType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableScrollLock={true}
        sx={{ maxHeight: 550 }}
      >
        <Box sx={{ bgcolor: "divider", px: 2.5, py: 1 }}>
          <Typography>STOCKS</Typography>
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          {sectorData[type]
            .filter((item: string | number) => item !== 0)
            .sort()
            .map((item: string) => (
              <Button
                component={Link}
                key={item}
                href={`/stock-details/${item}`}
                variant="text"
                size="small"
                color="info"
                sx={{
                  display: "block",
                  fontSize: ".85rem",
                  ":hover": {
                    background: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                {item}
              </Button>
            ))}
        </Box>
      </Popover>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          px: 2,
          mt: { xs: 3, sm: 8 },
          bgcolor: "secondaryBackground",
          borderRadius: 5,
        }}
      >
        <Typography color="text.secondary" sx={{ fontSize: "1.4rem" }}>
          Market trend
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
          <Box
            // component={Button}
            // onClick={(e) => handleClick(e, "uptrendItems")}
            sx={{
              display: "flex",
              alignItems: "center",
              m: 0,
              p: 0,
              ":hover": {
                background: "transparent",
              },
            }}
          >
            <KeyboardDoubleArrowUpRoundedIcon
              sx={{
                color: colors[0],
                fontSize: { xs: "1.6rem", sm: "2rem" },
                mr: 1,
              }}
            />
            <Typography
              sx={{
                color: colors[0],
                fontWeight: 700,
                mr: 4,
                fontSize: { xs: "1.6rem", sm: "2rem" },
              }}
            >
              {data.issuesAdvanced}
            </Typography>
          </Box>

          <Box
            // component={Button}
            // onClick={(e) => handleClick(e, "uptrendItems")}
            sx={{
              display: "flex",
              alignItems: "center",
              m: 0,
              p: 0,
              ":hover": {
                background: "transparent",
              },
            }}
          >
            <PauseCircleOutlineRoundedIcon
              sx={{ color: colors[1], mr: 1, fontSize: "1.8rem" }}
            />
            <Typography
              sx={{
                color: colors[1],
                mr: 4,
                fontSize: { xs: "1.6rem", sm: "2rem" },
                fontWeight: 700,
              }}
            >
              {data.issuesUnchanged}
            </Typography>
          </Box>
          <Box
            // component={Button}
            // onClick={(e) => handleClick(e, "uptrendItems")}
            sx={{
              display: "flex",
              alignItems: "center",
              m: 0,
              p: 0,
              ":hover": {
                background: "transparent",
              },
            }}
          >
            <KeyboardDoubleArrowDownRoundedIcon
              sx={{
                color: colors[2],
                fontSize: { xs: "1.6rem", sm: "2rem" },
                mr: 1,
              }}
            />
            <Typography
              sx={{
                color: colors[2],
                fontSize: { xs: "1.6rem", sm: "2rem" },
                fontWeight: 700,
              }}
            >
              {data.issuesDeclined}
            </Typography>
          </Box>
        </Stack>
        <Box>
          <PieChart
            data={[
              data.issuesAdvanced,
              data.issuesUnchanged,
              data.issuesDeclined,
            ]}
            colors={colors}
            labels={labels}
            // height={300}
            width={360}
            donutSize="60%"
          />
        </Box>
      </Paper>{" "}
    </>
  );
}
