"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  AppBar,
  Box,
  Button,
  Divider,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  InputBase,
  Fade,
  Slide,
  Drawer,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
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
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DataSaverOffRoundedIcon from "@mui/icons-material/DataSaverOffRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BatchPredictionRoundedIcon from "@mui/icons-material/BatchPredictionRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { TransitionProps } from "@mui/material/transitions";

import {
  authActions,
  favoriteActions,
  latestPriceActions,
  themeColorActions,
} from "_store";
import ToastMessage from "@/components/shared/ToastMessage";
import SearchStockCard from "./cards/SearchStockCard";
import SigninDialogContent from "./shared/SigninDialogContent";
import SearchBar from "./SearchBar";

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

export default function Header() {
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

  const [openSigninDialog, setOpenSigninDialog] = useState(false);

  const openMarket = Boolean(marketAnchorEl);
  const openStock = Boolean(stockAnchorEl);
  const openUser = Boolean(userAnchorEl);
  const openMobileView = Boolean(mobileViewAnchorEl);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [redirection, setRedirection] = React.useState<string | null>(null);

  const handleSigninDialogOpen = () => {
    setOpenSigninDialog(true);
  };

  const handleSigninDialogClose = () => {
    setOpenSigninDialog(false);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const handleLogoutToastColse = () => {
    setLogoutSuccess(false);
  };

  const handleSignOut = () => {
    setUserAnchorEl(null);
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
  const handleUserPopoverClose = (redirect: any = null, dialogOpen = false) => {
    setUserAnchorEl(null);

    if (!auth?.isLoggedIn && dialogOpen) {
      handleSigninDialogOpen();
      setRedirection(redirect);
    }
    if (auth?.isLoggedIn) {
      route.push(redirect);
    }
  };

  // console.log(openSigninDialog);

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
  };
  const handleSearchDialogClose = () => {
    setOpenSearchDialog(false);
    setSearchResult([]);
    setSearchResultFallbackText("Type trading code or company name");
    setSearchText("");
  };

  const getItemUrl = (
    type: string,
    tradingCode: string,
    sectorTag: string = ""
  ) => {
    let url = "";
    if (type == "stock") {
      url = `/stock-details/${tradingCode}`;
    } else if (type == "index") {
      url = `/index-details/${tradingCode}`;
    } else if (type == "sector") {
      url = `/sector/chart/${sectorTag}`;
    } else {
      url = "#";
    }
    return url;
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
    const res = await fetch(`/api/latest-price?v=1`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const initdata = await res.json();

    dispatch(latestPriceActions.setData(initdata));
  };

  const getFavorites = async () => {
    if (!auth) return;

    const res = await fetch(`/api/favorite?user=${auth?._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const initdata = await res.json();

    dispatch(favoriteActions.setData(initdata.favorites));
  };

  const externalDialogClose = () => {
    handleSigninDialogClose();
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
  }, [searchText]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getFavorites();
  }, [auth]);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const authDataFromStorage: any = localStorage.getItem("userInfo");
    const data = JSON.parse(authDataFromStorage);

    if (data) dispatch(authActions.login(data));
  }, [dispatch]);

  const userMenu = (
    <Box sx={{ pt: 0.8 }}>
      {auth?.isLoggedIn && (
        <>
          <Typography
            sx={{
              pl: 3,
              pr: 2,
              py: 1.5,
              fontSize: "1rem",
              textAlign: "left",
            }}
            color="text.secondary"
          >
            Hi, {auth?.name || "User"}
          </Typography>
          <Divider light />
        </>
      )}
      <Button
        // component={Link}
        // href="/favorites"
        onClick={() => handleUserPopoverClose("/favorites", true)}
        startIcon={<FavoriteBorderRoundedIcon color="primary" />}
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
        // component={Link}
        // href="/alerts"
        onClick={() => handleUserPopoverClose("/price-alerts", true)}
        startIcon={<NotificationsNoneRoundedIcon color="primary" />}
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
        Price alerts
      </Button>
      <Divider light />
      <Button
        // component={Link}
        // href="/portfolio"
        onClick={() => handleUserPopoverClose("/portfolio", true)}
        startIcon={<BusinessCenterOutlinedIcon color="primary" />}
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
        // component={Link}
        // href="/profile"
        onClick={() => handleUserPopoverClose("/profile", true)}
        startIcon={<Person2OutlinedIcon color="primary" />}
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
        My account
      </Button>
      <Divider light />
      {auth?.isLoggedIn ? (
        <>
          <Button
            onClick={handleSignOut}
            startIcon={<LogoutOutlinedIcon color="primary" />}
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
      ) : (
        <>
          <Button
            component={Link}
            href="/signin"
            startIcon={<LoginIcon color="primary" />}
            sx={{
              py: 1.2,
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
        </>
      )}
    </Box>
  );

  const stocksMenu = (
    <>
      <Button
        component={Link}
        href="/index-mover"
        startIcon={<TrendingUpRoundedIcon color="primary" />}
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
        Index movers
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/beta"
        startIcon={<DataSaverOffRoundedIcon color="primary" />}
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
        Beta
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/block-tr"
        startIcon={<BatchPredictionRoundedIcon color="primary" />}
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
        startIcon={<NewspaperRoundedIcon color="primary" />}
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
      <Button
        component={Link}
        href="/ipo"
        startIcon={<UpcomingRoundedIcon color="primary" />}
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
        href="/gainer-loser?type=gainer&variant=day"
        startIcon={<EmojiEventsRoundedIcon color="primary" />}
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
        startIcon={<CandlestickChartRoundedIcon color="primary" />}
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
        startIcon={<DonutSmallRoundedIcon color="primary" />}
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
      <Divider light />

      <Button
        component={Link}
        href="/index-mover"
        startIcon={<TrendingUpRoundedIcon color="primary" />}
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
        Index movers
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/beta"
        startIcon={<DataSaverOffRoundedIcon color="primary" />}
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
        Beta
      </Button>
      <Divider light />
      <Button
        component={Link}
        href="/block-tr"
        startIcon={<BatchPredictionRoundedIcon color="primary" />}
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
        startIcon={<NewspaperRoundedIcon color="primary" />}
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
      <Button
        component={Link}
        href="/ipo"
        startIcon={<UpcomingRoundedIcon color="primary" />}
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
        startIcon={<FilterAltOutlinedIcon color="primary" />}
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
        href="/supercharts?symbol=DSEX"
        startIcon={<AddchartOutlinedIcon color="primary" />}
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

      <Typography gutterBottom color="text.secondary" sx={{ px: 2.5, mt: 3 }}>
        Packages
      </Typography>
      <Button
        component={Link}
        href="/pricing"
        startIcon={<WorkspacePremiumRoundedIcon color="primary" />}
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
        Premium
      </Button>
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
          <Box component={Link} href="/">
            <img
              src={
                themeColor === "dark"
                  ? "/images/logo/logo-full-dark.png"
                  : "/images/logo/logo-full-light.png"
              }
              style={{
                width: "auto",
                marginTop: "5px",
                height: matchesSmUp ? "40px" : "35px",
                cursor: "pointer",
              }}
              alt="logo of stocksupporter"
            />
          </Box>

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
                href="/supercharts?symbol=DSEX"
                sx={{
                  color: "text.primary",
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Supercharts
              </Button>
              <Button
                component={Link}
                href="/pricing"
                sx={{
                  color: "text.primary",
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Premium
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
                sx={{
                  borderRadius: 3,
                  border: `1.2px solid ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}`,
                  padding: 0.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  mx: { xs: 0.5, sm: 1 },
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
                mx: { xs: 0.5, sm: 1 },
              }}
            >
              {themeColor === "dark" ? (
                <LightModeOutlinedIcon color="primary" />
              ) : (
                <DarkModeOutlinedIcon color="primary" />
              )}
            </IconButton>

            <IconButton
              sx={{
                borderRadius: 3,
                border: `1.2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                padding: { xs: 0.5, sm: 0.8 },
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                mx: { xs: 0.5, sm: 1 },
              }}
              aria-owns={openUser ? "user-mouse-over-popover" : undefined}
              aria-haspopup="true"
              onClick={handleUserPopoverOpen}
            >
              <PersonOutlineRoundedIcon color="primary" />
            </IconButton>

            {matchesSmDown && (
              <>
                <IconButton
                  aria-label="delete"
                  sx={{
                    borderRadius: 3,
                    border: `1.2px solid ${alpha(
                      theme.palette.warning.main,
                      0.2
                    )}`,
                    padding: 0.5,
                    bgcolor: alpha(theme.palette.warning.main, 0.03),
                    mx: { xs: 0.5, sm: 1 },
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
          <Box sx={{ ml: 2.4, my: 3 }}>
            {/* <Typography
              variant="h5"
              component={Link}
              href="/"
              color="primary.main"
            >
              Stocksupporter
            </Typography> */}

            <Box component={Link} href="/">
              <img
                src={
                  themeColor === "dark"
                    ? "/images/logo/logo-full-dark.png"
                    : "/images/logo/logo-full-light.png"
                }
                style={{
                  width: "auto",
                  marginTop: "5px",
                  height: matchesSmUp ? "40px" : "35px",
                  cursor: "pointer",
                }}
                alt="logo of stocksupporter"
              />
            </Box>
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
        id="user-menu-popover"
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
        onClose={() => handleUserPopoverClose()}
      >
        <Box
          sx={{
            width: 210,
            pb: 1.2,
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
            <Box sx={{ pb: 1 }}>
              {searchResult.map((item: any) => (
                <Box key={item.tradingCode} onClick={handleSearchDialogClose}>
                  <Box
                    component={Link}
                    href={getItemUrl(
                      item.type,
                      item.tradingCode,
                      item.sectorTag
                    )}
                    sx={{
                      display: item.tradingCode ? "block" : "none",
                    }}
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

      <Dialog
        open={openSigninDialog}
        onClose={handleSigninDialogClose}
        fullWidth
        maxWidth="sm"
        disableScrollLock={true}
      >
        <SigninDialogContent
          redirect={redirection}
          externalDialogClose={externalDialogClose}
        />
        <IconButton
          onClick={handleSigninDialogClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon sx={{ fontSize: "1.6rem" }} />
        </IconButton>
      </Dialog>
    </>
  );
}
