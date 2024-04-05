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
  Fade,
  Slide,
  Drawer,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import Link from "next/link";
import DarkThemeButton from "./DarkThemeButton";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { latestPriceActions, themeColorActions } from "_store";
import { styled, alpha } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TableChartIcon from "@mui/icons-material/TableChart";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import BarChartIcon from "@mui/icons-material/BarChart";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import HexagonIcon from "@mui/icons-material/Hexagon";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
import MultilineChartRoundedIcon from "@mui/icons-material/MultilineChartRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ScatterPlotRoundedIcon from "@mui/icons-material/ScatterPlotRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import HexagonRoundedIcon from "@mui/icons-material/HexagonRounded";
import UpcomingRoundedIcon from "@mui/icons-material/UpcomingRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { TransitionProps } from "@mui/material/transitions";

const TransitionSlide = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionFade = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export default function Header(props: any) {
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const themeColor = useSelector((state: any) => state.themeColor);

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const [searchText, setSearchText] = useState("");

  const [searchResultFallbackText, setSearchResultFallbackText] = useState(
    "Type trading code or company name"
  );
  const [searchResult, setSearchResult] = useState(latestPrice);

  const [marketAnchorEl, setMarketAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [stockAnchorEl, setStockAnchorEl] = useState<HTMLElement | null>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
  const [mobileViewAnchorEl, setMobileViewAnchorEl] =
    useState<HTMLElement | null>(null);

  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const openMarket = Boolean(marketAnchorEl);
  const openStock = Boolean(stockAnchorEl);
  const openUser = Boolean(userAnchorEl);
  const openMobileView = Boolean(mobileViewAnchorEl);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const handleMarketPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMarketAnchorEl(event.currentTarget);
  };
  const handleMarketPopoverClose = () => {
    setMarketAnchorEl(null);
  };

  const handleStockPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setStockAnchorEl(event.currentTarget);
    handleMarketPopoverClose();
  };
  const handleStockPopoverClose = () => {
    setStockAnchorEl(null);
  };
  const handleUserPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserPopoverClose = () => {
    setUserAnchorEl(null);
  };
  const handleMobileViewPopoverOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setMobileViewAnchorEl(event.currentTarget);
  };
  const handleMobileViewPopoverClose = () => {
    setMobileViewAnchorEl(null);
  };

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleSearchDialogOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenSearchDialog(true);
    // getSharesBySearch(true);
    // setSearchResult(latestPrice);
  };
  const handleSearchDialogClose = () => {
    setOpenSearchDialog(false);
    setSearchResult([]);
    setSearchResultFallbackText("Type trading code or company name");
    setSearchText("");
  };

  const getSharesBySearch = async (init = false) => {
    setSearchResultFallbackText("Loading..");
    const initdata = latestPrice || [];
    const data = initdata.filter(
      (item: any) =>
        item.tradingCode?.search(new RegExp(searchText, "i")) !== -1 ||
        item.companyName?.search(new RegExp(searchText, "i")) !== -1
    );
    if (data.length === 0) {
      setSearchResultFallbackText("No results found");
    } else {
      setSearchResult(data);
    }
  };

  const toggleTheme = () => {
    const theme = themeColor === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    dispatch(themeColorActions.setThemeColor(theme));
  };

  useEffect(() => {
    const themeColor = localStorage.getItem("theme");
    if (themeColor) {
      dispatch(themeColorActions.setThemeColor(themeColor));
    } else {
      localStorage.setItem("theme", "light");
      dispatch(themeColorActions.setThemeColor("light"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchText !== "") {
      const debounceFn = setTimeout(() => {
        getSharesBySearch();
      }, 1000);
      return () => clearTimeout(debounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/latest-price`, {
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const initdata = await res.json();
      dispatch(latestPriceActions.setData(initdata));
    };
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/latest-price`, {
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const initdata = await res.json();
      // console.log("schdl", initdata[0]);
      dispatch(latestPriceActions.setData(initdata));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const userMenu = (
    <>
      <Button
        component={Link}
        href="/signin"
        startIcon={<LoginIcon color="primary" />}
        sx={{
          py: 1,
          px: 3,
          textAlign: "left",
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Sign in
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/signup"
        startIcon={<AddCircleOutlineIcon color="primary" />}
        sx={{
          py: 1,
          px: 3,
          textAlign: "left",
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Create account
      </Button>
      {/* <Divider light />
      <DarkThemeButton /> */}
    </>
  );

  const stocksMenu = (
    <>
      <Button
        component={Link}
        href="/latest-price"
        startIcon={<LeaderboardRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          textAlign: "left",
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        All shares
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/block-tr"
        startIcon={<HexagonRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Block transections
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/latest-news"
        startIcon={<NewspaperRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        News
      </Button>
      <Divider light />
      {/* <Button
        component={Link}
        href="/"
        startIcon={<ScatterPlotRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Sector wise shares
      </Button>
      <Divider light /> */}
      <Button
        component={Link}
        href="/ipo"
        startIcon={<UpcomingRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Upcoming IPO
      </Button>
    </>
  );

  const marketsMenu = (
    <>
      <Button
        component={Link}
        href="/market-today"
        startIcon={<InsightsRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          textAlign: "left",
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Market today
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/gainer-loser?type=gainer&variant=1d"
        startIcon={<WhatshotRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Top shares
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/latest-price"
        startIcon={<CandlestickChartRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Latest price
      </Button>
      <Divider light />

      <Button
        component={Link}
        href="/sector"
        startIcon={<DonutSmallRoundedIcon color="info" />}
        sx={{
          py: 1,
          px: 3,
          color: "text.primary",
          ":hover": {
            background: "transparent",
            color: "primary.main",
          },
        }}
        disableRipple
      >
        Sector dashboard
      </Button>
    </>
  );

  const mobileViewMenu = (
    <>
      <Typography gutterBottom color="text.secondary" sx={{ px: 2.5, mt: 2 }}>
        Markets
      </Typography>
      {marketsMenu}
      <Typography gutterBottom color="text.secondary" sx={{ px: 2.5, mt: 3 }}>
        Stocks
      </Typography>
      {stocksMenu}
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          borderBottom: `1px solid ${theme.palette.appbarBorderBottom}`,
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: { xs: "inherit", sm: "1250px" },
            height: 20,
            mx: "auto",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            href="/"
            color="primary.main"
          >
            StockSupporter
          </Typography>

          {matchesSmUp && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <SearchBar onClick={handleSearchDialogOpen} />
              <Button
                aria-owns={
                  openMarket ? "markets-mouse-over-popover" : undefined
                }
                aria-haspopup="true"
                onClick={handleMarketPopoverOpen}
                endIcon={<ExpandMoreRoundedIcon />}
                sx={{
                  ".MuiButton-endIcon": {
                    ml: 0.2,
                    color: "text.secondary",
                  },
                  color: "text.primary",
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Markets
              </Button>
              <Button
                component={Link}
                href="/screener"
                sx={{
                  color: "text.primary",
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Screener
              </Button>
              <Button
                component={Link}
                href="/supercharts"
                sx={{
                  color: "text.primary",
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Supercharts
              </Button>
              <Button
                aria-owns={openStock ? "stocks-mouse-over-popover" : undefined}
                aria-haspopup="true"
                onClick={handleStockPopoverOpen}
                endIcon={<ExpandMoreRoundedIcon />}
                sx={{
                  ".MuiButton-endIcon": {
                    ml: 0.2,
                    color: "text.secondary",
                  },
                  color: "text.primary",
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Stocks
              </Button>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {!matchesSmUp && (
              <IconButton
                aria-label="delete"
                sx={{
                  borderRadius: 3, // Make the button round
                  border: `1.2px solid ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}`, // Add border
                  padding: 0.5, // Adjust padding as needed
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  mx: { xs: 0.8, sm: 1 },
                }}
                onClick={handleSearchDialogOpen}
              >
                <SearchRoundedIcon color="primary" />
              </IconButton>
            )}
            <IconButton
              onClick={toggleTheme}
              sx={{
                borderRadius: 3, // Make the button round
                border: `1.2px solid ${alpha(theme.palette.primary.main, 0.2)}`, // Add border
                padding: { xs: 0.5, sm: 0.8 }, // Adjust padding as needed
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                mx: { xs: 0.8, sm: 1 },
              }}
            >
              {themeColor === "dark" ? (
                <LightModeOutlinedIcon color="primary" />
              ) : (
                <DarkModeOutlinedIcon color="primary" />
              )}
            </IconButton>

            {!matchesSmUp && (
              <>
                <IconButton
                  aria-label="delete"
                  sx={{
                    borderRadius: 3, // Make the button round
                    border: `1.2px solid ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`, // Add border
                    padding: 0.5, // Adjust padding as needed
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    mx: { xs: 0.8, sm: 1 },
                  }}
                  aria-owns={openUser ? "user-mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onClick={handleUserPopoverOpen}
                >
                  <PersonOutlineRoundedIcon color="primary" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  sx={{
                    borderRadius: 3, // Make the button round
                    border: `1.2px solid ${alpha(
                      theme.palette.warning.main,
                      0.2
                    )}`, // Add border
                    padding: 0.5, // Adjust padding as needed
                    bgcolor: alpha(theme.palette.warning.main, 0.03),
                    mx: { xs: 0.8, sm: 1 },
                  }}
                  aria-owns={
                    openMobileView ? "mobile-mouse-over-popover" : undefined
                  }
                  aria-haspopup="true"
                  // onClick={handleMobileViewPopoverOpen}
                  onClick={toggleDrawer(true)}
                >
                  <MenuRoundedIcon color="warning" />
                </IconButton>
              </>
            )}

            {matchesSmUp && (
              <Button
                aria-owns={openUser ? "user-mouse-over-popover" : undefined}
                aria-haspopup="true"
                onClick={handleUserPopoverOpen}
                endIcon={<ExpandMoreRoundedIcon />}
                variant="outlined"
                color="primary"
                // size="small"
                sx={{
                  ".MuiButton-endIcon": {
                    ml: 0,
                  },
                  borderRadius: 3,
                  px: 2.2,
                  ml: 1.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                }}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ bgcolor: "background.default" }} />

      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box sx={{ ml: 2.8, mt: 3, mb: 2.5 }}>
            <Typography
              variant="h5"
              component={Link}
              href="/"
              color="primary.main"
            >
              Stock Supporter
            </Typography>
          </Box>
          {mobileViewMenu}
        </Box>
      </Drawer>

      <Popover
        id="mobile-mouse-over-popover"
        open={openMobileView}
        anchorEl={mobileViewAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: 2,
          },
        }}
        disableScrollLock={true}
        onClose={handleMobileViewPopoverClose}
      >
        <Box
          onMouseLeave={handleMobileViewPopoverClose}
          sx={{
            width: 230,
            py: 1.2,
          }}
        >
          {mobileViewMenu}
        </Box>
      </Popover>

      <Popover
        id="user-mouse-over-popover"
        open={openUser}
        anchorEl={userAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: 2,
          },
        }}
        disableScrollLock={true}
        onClose={handleUserPopoverClose}
      >
        <Box
          onMouseLeave={handleUserPopoverClose}
          sx={{
            width: 210,
            py: 1.2,
          }}
        >
          {userMenu}
        </Box>
      </Popover>

      <Popover
        id="stocks-mouse-over-popover"
        open={openStock}
        anchorEl={stockAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{ paper: { onMouseLeave: handleStockPopoverClose } }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: 2,
          },
          // pointerEvents: 'none',
        }}
        disableScrollLock={true}
        onClose={handleStockPopoverClose}
      >
        <Box
          sx={{
            width: 220,
            py: 1,
            pointerEvents: "auto",
          }}
        >
          {stocksMenu}
        </Box>
      </Popover>

      <Popover
        id="markets-mouse-over-popover"
        open={openMarket}
        anchorEl={marketAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{ paper: { onMouseLeave: handleMarketPopoverClose } }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: 2,
          },
          // pointerEvents: 'none',
        }}
        disableScrollLock={true}
        onClose={handleMarketPopoverClose}
      >
        <Box
          sx={{
            width: 220,
            py: 1,
            pointerEvents: "auto",
          }}
        >
          {marketsMenu}
        </Box>

        {/* <Box sx={{ width: 500, p: 2, pointerEvents: "auto" }}>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Box sx={{ py: 2, px: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  Market information
                </Typography>
                <Button
                  component={Link}
                  href="/market-today"
                  startIcon={<StackedLineChartIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Market today
                </Button>
                <Button
                  component={Link}
                  href="/latest-price"
                  startIcon={<CandlestickChartIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Latest share price
                </Button>
                <Button
                  component={Link}
                  href="/gainer-loser?type=gainer&variant=1d"
                  startIcon={<TrendingUpIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Top gainers
                </Button>
                <Button
                  component={Link}
                  href="/gainer-loser?type=loser&variant=1d"
                  startIcon={<TrendingDownIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Top loosers
                </Button>
              </Box>

              <Box sx={{ py: 2, px: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  News
                </Typography>
                <Button
                  component={Link}
                  href="/latest-news"
                  startIcon={<NewspaperIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Latest news
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ py: 2, px: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  Sectors
                </Typography>

                <Button
                  component={Link}
                  href="/sector"
                  startIcon={<DonutSmallIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Sector dashboard
                </Button>

                <Button
                  component={Link}
                  href="/"
                  startIcon={<QueryStatsIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Sector wise share list
                </Button>
              </Box>

              <Box sx={{ py: 2, px: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  IPO dashboard
                </Typography>
                <Button
                  component={Link}
                  href="/ipo"
                  startIcon={<UpcomingIcon color="info" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: "text.primary",
                    ":hover": {
                      background: "transparent",
                      color: "info.main",
                    },
                  }}
                  disableRipple
                >
                  Upcoming IPO
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box> */}
      </Popover>

      <Dialog
        open={openSearchDialog}
        onClose={handleSearchDialogClose}
        fullWidth
        fullScreen={!matchesSmUp}
        disableScrollLock={true}
        TransitionComponent={matchesSmUp ? TransitionFade : TransitionSlide}
        sx={{ "& .MuiDialog-paper": { borderRadius: 3 } }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon color="primary" sx={{ fontSize: "1.5rem" }} />
            <InputBase
              name="searchText"
              fullWidth
              autoFocus
              value={searchText}
              onChange={handleSearchTextChange}
              sx={{ mx: 2, fontSize: "1.1rem" }}
              placeholder="Search stocks"
            />
            <IconButton onClick={handleSearchDialogClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ px: { xs: 1.5, sm: 4 } }}>
          <Box sx={{ height: "450px" }}>
            <Box>
              {searchResult.map((item: any) => (
                <Box
                  component={Link}
                  href={`/stock-details/${item.tradingCode}`}
                  key={item.tradingCode}
                  onClick={handleSearchDialogClose}
                >
                  <Paper
                    sx={{
                      mb: 1.5,
                      px: { xs: 1, sm: 3 },
                      py: 1,
                      borderRadius: 2,
                      ":hover": {
                        bgcolor: "financeCardTitlecolor",
                      },
                    }}
                    elevation={0}
                    variant="outlined"
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={8.6} sm={9.5}>
                        <Typography
                          gutterBottom
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "text.primary",
                          }}
                        >
                          {item.companyName}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          sx={{ mb: 0.5 }}
                        >
                          <Chip
                            label={item.tradingCode}
                            // variant="outlined"
                            color="info"
                            size="small"
                            sx={{
                              borderRadius: 1,
                              mr: { xs: 0.5, sm: 2 },
                            }}
                          />
                          <Chip
                            label={item.category}
                            size="small"
                            // variant="outlined"
                            sx={{
                              mr: { xs: 0.5, sm: 1 },
                            }}
                          />
                          <Chip
                            label={
                              matchesSmUp
                                ? item.sector
                                : item.sector.substring(0, 12) +
                                  (item.sector.length > 12 ? ".." : "")
                            }
                            variant="outlined"
                            size="small"
                            sx={{ px: 0.5 }}
                          />
                        </Stack>
                        <Typography color="text.primary">
                          Vol: {item.volume} | Val:{" "}
                          {(item.value / 10).toFixed(2)}
                          cr | Trd: {item.trade}
                        </Typography>
                      </Grid>

                      <Grid item xs={3.3} sm={2.5}>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          sx={{ mr: 0.7 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "1.5rem",
                              fontWeight: 500,
                              color:
                                item.change === 0
                                  ? "primary.main"
                                  : item.change < 0
                                  ? "error.main"
                                  : "success.main",
                            }}
                          >
                            {item.ltp}
                          </Typography>
                          <Typography
                            sx={{ fontSize: ".85rem", ml: 0.5 }}
                            color="text.secondary"
                          >
                            BDT
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                          <Chip
                            label={item.change}
                            size="small"
                            sx={{
                              borderRadius: 1,
                              mr: 1,
                              color:
                                item.change === 0
                                  ? "primary.main"
                                  : item.change < 0
                                  ? "error.main"
                                  : "success.main",
                              fontWeight: 500,
                            }}
                          />

                          {item.change !== 0 && (
                            <Chip
                              label={`${item.percentChange}%`}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                color:
                                  item.change === 0
                                    ? "primary.main"
                                    : item.change < 0
                                    ? "error.main"
                                    : "success.main",
                                fontWeight: 500,
                              }}
                            />
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              ))}
              {searchResult.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: { xs: 200, sm: 350 },
                    mx: "auto",
                    textAlign: "center",
                    mt: { xs: 4, sm: 2 },
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "1.1rem" }}
                  >
                    {searchResultFallbackText}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
