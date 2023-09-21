'use client';
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
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import DarkThemeButton from './DarkThemeButton';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { themeColorActions } from '_store';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TableChartIcon from '@mui/icons-material/TableChart';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import BarChartIcon from '@mui/icons-material/BarChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBar from './SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';

export default function Header(props: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const [marketAnchorEl, setMarketAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [stockAnchorEl, setStockAnchorEl] = useState<HTMLElement | null>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);

  const openMarket = Boolean(marketAnchorEl);
  const openStock = Boolean(stockAnchorEl);
  const openUser = Boolean(userAnchorEl);

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

  useEffect(() => {
    const themeColor = localStorage.getItem('theme');
    if (themeColor) {
      dispatch(themeColorActions.setThemeColor(themeColor));
    } else {
      localStorage.setItem('theme', 'light');
      dispatch(themeColorActions.setThemeColor('light'));
    }
  }, [dispatch]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
        variant="outlined"
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: { xs: 'inherit', sm: '1200px' },
            height: 20,
            mx: 'auto',
          }}
        >
          <Typography variant="h6" component={Link} href="/">
            Stock Analyst
          </Typography>

          {matchesSmUp && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Button
                aria-owns={
                  openMarket ? 'markets-mouse-over-popover' : undefined
                }
                aria-haspopup="true"
                onMouseEnter={handleMarketPopoverOpen}
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 5,
                }}
              >
                Markets
              </Button>
              <Button
                component={Link}
                href="/supercharts"
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 5,
                }}
              >
                Supercharts
              </Button>
              <Button
                component={Link}
                href="/alerts"
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 5,
                }}
              >
                Alerts
              </Button>
              <Button
                component={Link}
                href="/favourites"
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 5,
                }}
              >
                Favourites
              </Button>
              <Button
                aria-owns={openStock ? 'stocks-mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleStockPopoverOpen}
                sx={{
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 5,
                }}
              >
                Stocks
              </Button>
              <SearchBar />
            </Box>
          )}

          <IconButton
            aria-owns={openUser ? 'user-mouse-over-popover' : undefined}
            aria-haspopup="true"
            onClick={handleUserPopoverOpen}
          >
            <Avatar sx={{ width: 35, height: 35 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Popover
        id="user-mouse-over-popover"
        open={openUser}
        anchorEl={userAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        onClose={handleUserPopoverClose}
      >
        {/* <Box
          // onMouseLeave={handleUserPopoverClose}
          sx={{
            width: 250,
            py: 1,
          }}
        > */}
        <Button
          component={Link}
          href="/signin"
          startIcon={<LoginIcon color="primary" />}
          sx={{
            py: 1,
            px: 3,
            textAlign: 'left',
            color: 'text.primary',
            ':hover': {
              background: 'transparent',
              color: 'primary.main',
              textDecoration: 'underline',
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
            textAlign: 'left',
            color: 'text.primary',
            ':hover': {
              background: 'transparent',
              color: 'primary.main',
              textDecoration: 'underline',
            },
          }}
          disableRipple
        >
          Create new account
        </Button>
        <Divider light />
        <DarkThemeButton />
        {/* </Box> */}
      </Popover>

      <Popover
        id="stocks-mouse-over-popover"
        open={openStock}
        anchorEl={stockAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        onClose={handleStockPopoverClose}
      >
        <Box
          onMouseLeave={handleStockPopoverClose}
          sx={{
            width: 220,
            py: 1,
          }}
        >
          <Button
            component={Link}
            href="/latest-price"
            startIcon={<BarChartIcon color="primary" />}
            sx={{
              py: 1,
              px: 3,
              textAlign: 'left',
              color: 'text.primary',
              ':hover': {
                background: 'transparent',
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            disableRipple
          >
            All shares
          </Button>
          <Divider light />

          <Button
            component={Link}
            href="/top-gainer"
            startIcon={<TrendingUpIcon color="primary" />}
            sx={{
              py: 1,
              px: 3,
              color: 'text.primary',
              ':hover': {
                background: 'transparent',
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            disableRipple
          >
            Top gainers
          </Button>
          <Divider light />
          <Button
            component={Link}
            href="/top-looser"
            startIcon={<TrendingDownIcon color="primary" />}
            sx={{
              py: 1,
              px: 3,
              color: 'text.primary',
              ':hover': {
                background: 'transparent',
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            disableRipple
          >
            Top loosers
          </Button>
          <Divider light />
          <Button
            component={Link}
            href="/block-tr"
            startIcon={<HexagonIcon color="primary" />}
            sx={{
              py: 1,
              px: 3,
              color: 'text.primary',
              ':hover': {
                background: 'transparent',
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            disableRipple
          >
            Block transections
          </Button>
        </Box>
      </Popover>

      <Popover
        id="markets-mouse-over-popover"
        open={openMarket}
        anchorEl={marketAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleMarketPopoverClose}
      >
        <Box onMouseLeave={handleMarketPopoverClose} sx={{ width: 500, p: 2 }}>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Box sx={{ py: 2, px: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  Market information
                </Typography>
                <Button
                  component={Link}
                  href="/market-today"
                  startIcon={<StackedLineChartIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                  disableRipple
                >
                  Market today
                </Button>
                <Button
                  component={Link}
                  href="/latest-price"
                  startIcon={<CandlestickChartIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                  disableRipple
                >
                  Latest share price
                </Button>
                <Button
                  component={Link}
                  href="/top-gainer"
                  startIcon={<TrendingUpIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                  disableRipple
                >
                  Top gainers
                </Button>
                <Button
                  component={Link}
                  href="/top-looser"
                  startIcon={<TrendingDownIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
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
                  href="/news"
                  startIcon={<NewspaperIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
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
                  startIcon={<DonutSmallIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                  disableRipple
                >
                  Sector dashboard
                </Button>

                <Button
                  component={Link}
                  href="/"
                  startIcon={<QueryStatsIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
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
                  startIcon={<UpcomingIcon color="primary" />}
                  sx={{
                    py: 0.8,
                    px: 0.6,
                    color: 'text.primary',
                    ':hover': {
                      background: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                  disableRipple
                >
                  Upcoming IPO
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </>
  );
}
