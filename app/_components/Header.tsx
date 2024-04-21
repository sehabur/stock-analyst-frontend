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

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { authActions, latestPriceActions, themeColorActions } from "_store";
import { styled, alpha } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBar from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";

import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import HexagonRoundedIcon from "@mui/icons-material/HexagonRounded";
import UpcomingRoundedIcon from "@mui/icons-material/UpcomingRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/navigation";

import ToastMessage from "@/components/shared/ToastMessage";
import SearchStockCard from "./cards/SearchStockCard";

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

  const route = useRouter();

  const theme: any = useTheme();

  const themeColor = useSelector((state: any) => state.themeColor);

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const auth = useSelector((state: any) => state.auth);

  const [searchText, setSearchText] = useState("");

  const [logoutSuccess, setLogoutSuccess] = useState(false);

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

  const handleLogoutToastColse = () => {
    setLogoutSuccess(false);
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
    setLogoutSuccess(true);
    route.push("/");
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
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      await getData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const authDataFromStorage: any = localStorage.getItem("userInfo");
    const data = JSON.parse(authDataFromStorage);
    data && dispatch(authActions.login(data));
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

  const loggedInUserMenu = (
    <>
      <Typography
        sx={{
          pl: 3,
          pr: 2,
          pt: 2,
          pb: 1.5,
          fontSize: "1rem",
          textAlign: "left",
        }}
        color="text.secondary"
      >
        Hello, {auth?.name}
      </Typography>
      <Divider light />
      <Button
        component={Link}
        href="/favorites"
        startIcon={<FavoriteBorderRoundedIcon color="info" />}
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
        Favorites
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/alerts"
        startIcon={<BusinessCenterOutlinedIcon color="info" />}
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
        Alerts
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/portfolio"
        startIcon={<NotificationsNoneRoundedIcon color="info" />}
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
        Portfolio
      </Button>
      <Divider light />
      <Button
        onClick={handleSignOut}
        startIcon={<LogoutOutlinedIcon color="info" />}
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
        Logout
      </Button>
    </>
  );

  const stocksMenu = (
    <>
      <Button
        component={Link}
        href="/latest-price"
        startIcon={<ListOutlinedIcon color="info" />}
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
      <Button
        component={Link}
        href="/screener"
        startIcon={<FilterAltOutlinedIcon color="info" />}
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
        Screener
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/supercharts?symbol=GP"
        startIcon={<AddchartOutlinedIcon color="info" />}
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
        Supercharts
      </Button>
      <Divider light />
      {stocksMenu}
    </>
  );

  return (
    <>
      <ToastMessage
        open={logoutSuccess}
        onClose={handleLogoutToastColse}
        severity="success"
        message="Logout Successful!"
      />
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
            {matchesSmDown && (
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
                borderRadius: 3,
                border: `1.2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                padding: { xs: 0.5, sm: 0.8 },
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

            <IconButton
              aria-label="delete"
              sx={{
                borderRadius: 3,
                border: {
                  xs: `1.2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  sm: `1.2px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                },
                padding: { xs: 0.5, sm: 0.8 },
                bgcolor: {
                  xs: alpha(theme.palette.primary.main, 0.03),
                  sm: alpha(theme.palette.warning.main, 0.03),
                },
                mx: { xs: 0.8, sm: 1 },
              }}
              aria-owns={openUser ? "user-mouse-over-popover" : undefined}
              aria-haspopup="true"
              onClick={handleUserPopoverOpen}
            >
              <PersonOutlineRoundedIcon color="warning" />
            </IconButton>

            {matchesSmDown && (
              <>
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
            pb: 1.2,
          }}
        >
          {auth?.isLoggedIn ? loggedInUserMenu : userMenu}
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
      </Popover>

      <Dialog
        open={openSearchDialog}
        onClose={handleSearchDialogClose}
        fullWidth
        fullScreen={matchesSmDown}
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
        <DialogContent dividers sx={{ px: { xs: 2, sm: 4 } }}>
          <Box sx={{ height: "450px" }}>
            <Box>
              {searchResult.map((item: any) => (
                <Box key={item.tradingCode} onClick={handleSearchDialogClose}>
                  <Box
                    component={Link}
                    href={`/stock-details/${item.tradingCode}`}
                  >
                    <SearchStockCard data={item} />
                  </Box>
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
