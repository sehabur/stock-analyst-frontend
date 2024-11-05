"use client";
import PieChart from "@/components/charts/PieChart";

import {
  Paper,
  Typography,
  Stack,
  useTheme,
  Box,
  Divider,
} from "@mui/material";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import GaugeChart from "../charts/GaugeChart";
import MarketPieChart from "../charts/MarketPieChart";

const colors = ["#24b29b", "#448aff", "#f45e6a"];
const labels = ["Uptrend", "Neutral", "Downtrend"];

export default function MarketMoverChart({ data, rsi, sectorData }: any) {
  const theme: any = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // const [type, setType] = useState<any>("uptrendItems");

  // const handleClick = (
  //   event: React.MouseEvent<HTMLButtonElement>,
  //   type: string
  // ) => {
  //   setAnchorEl(event.currentTarget);
  //   setType(type);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      {/* <Popover
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
      </Popover> */}
      <Paper
        elevation={0}
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          pt: 2,
          pb: 1,
          px: 0,
          bgcolor: "background.default",
          borderRadius: 3,
        }}
      >
        <Typography
          color="text.secondary"
          sx={{
            fontSize: "1.4rem",
            fontWeight: 600,
            mt: 1,
            mb: 2,
            textAlign: "center",
          }}
        >
          Market trend
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 1 }}
        >
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MarketPieChart
            data={[
              data.issuesAdvanced,
              data.issuesUnchanged,
              data.issuesDeclined,
            ]}
            colors={colors}
            labels={labels}
            // height={300}
            width={matchesSmUp ? 385 : 375}
            donutSize="60%"
          />
        </Box>
        <Box sx={{ mb: 3.5, mt: 3 }}>
          <Divider light />
        </Box>
        <Box>
          <Typography
            color="text.secondary"
            sx={{ fontSize: "1.4rem", fontWeight: 600, textAlign: "center" }}
          >
            Sentiment
          </Typography>

          <GaugeChart rsi={rsi} />
        </Box>
      </Paper>
    </Box>
  );
}
