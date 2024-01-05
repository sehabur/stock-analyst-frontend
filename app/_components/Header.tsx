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
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Stack,
  Chip,
  Paper,
  DialogTitle,
  InputBase,
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Header(props: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const [searchText, setSearchText] = useState('');
  const [searchResultFallbackText, setSearchResultFallbackText] = useState(
    'Type stock name to search'
  );
  const [searchResult, setSearchResult] = useState([]);

  const [marketAnchorEl, setMarketAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [stockAnchorEl, setStockAnchorEl] = useState<HTMLElement | null>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);

  const [openSearchDialog, setOpenSearchDialog] = useState(false);

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

  const handleSearchTextChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  const handleSearchDialogOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenSearchDialog(true);
  };
  const handleSearchDialogClose = () => {
    setOpenSearchDialog(false);
    setSearchResult([]);
    setSearchResultFallbackText('Type stock name to search');
    setSearchText('');
  };

  const getSharesBySearch = async () => {
    setSearchResultFallbackText('Loading..');
    setSearchResult([]);

    const res = await fetch(`/api/search?id=${searchText}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    if (data.length === 0) {
      setSearchResultFallbackText('No results found');
    } else {
      setSearchResult(data);
    }
    // const res = await axios.get(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/latestPricesBySearch?search=${searchText}`
    // );

    // if (res.data.length === 0) {
    //   setSearchResultFallbackText('No results found');
    // } else {
    //   setSearchResult(res.data);
    // }
  };

  // console.log(searchResult);

  useEffect(() => {
    const themeColor = localStorage.getItem('theme');
    if (themeColor) {
      dispatch(themeColorActions.setThemeColor(themeColor));
    } else {
      localStorage.setItem('theme', 'light');
      dispatch(themeColorActions.setThemeColor('light'));
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchText !== '') {
      const debounceFn = setTimeout(() => {
        getSharesBySearch();
      }, 2000);
      return () => clearTimeout(debounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
        elevation={0}
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
            Stock Supporter
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
                onClick={handleMarketPopoverOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  '.MuiButton-endIcon': {
                    ml: 0.2,
                    color: 'text.secondary',
                  },
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 8,
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
                  borderRadius: 8,
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
                  borderRadius: 8,
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
                  borderRadius: 8,
                }}
              >
                Favourites
              </Button>
              <Button
                aria-owns={openStock ? 'stocks-mouse-over-popover' : undefined}
                aria-haspopup="true"
                onClick={handleStockPopoverOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  '.MuiButton-endIcon': {
                    ml: 0.2,
                    color: 'text.secondary',
                  },
                  color: 'text.primary',
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Stocks
              </Button>
              <SearchBar onClick={handleSearchDialogOpen} />
            </Box>
          )}

          <Button
            aria-owns={openUser ? 'user-mouse-over-popover' : undefined}
            aria-haspopup="true"
            onClick={handleUserPopoverOpen}
            endIcon={<ExpandMoreIcon />}
            variant="outlined"
            color="primary"
            sx={{
              '.MuiButton-endIcon': {
                ml: 0,
              },
              borderRadius: 1,
              px: 2,
            }}
          >
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ bgcolor: 'background.default' }} />

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
        <Box
          onMouseLeave={handleUserPopoverClose}
          sx={{
            width: 220,
            py: 1.2,
          }}
        >
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
            Create account
          </Button>
          <Divider light />
          <DarkThemeButton />
        </Box>
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
            href="/gainer-loser?type=gainer&variant=1d"
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
            href="/gainer-loser?type=loser&variant=1d"
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
                  href="/gainer-loser?type=gainer&variant=1d"
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
                  href="/gainer-loser?type=loser&variant=1d"
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
                  href="/latest-news"
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

      <Dialog
        open={openSearchDialog}
        onClose={handleSearchDialogClose}
        fullWidth
        maxWidth="sm"
        disableScrollLock={true}
        sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchIcon color="primary" sx={{ fontSize: '1.5rem' }} />
            <InputBase
              name="searchText"
              fullWidth
              autoFocus
              value={searchText}
              onChange={handleSearchTextChange}
              sx={{ mx: 2, fontSize: '1.1rem' }}
              placeholder="Seacrh share by code or company name"
            />
            <IconButton onClick={handleSearchDialogClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ height: '450px' }}>
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
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      ':hover': {
                        bgcolor: 'secondaryBackground',
                      },
                    }}
                    elevation={0}
                    variant="outlined"
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={9.5}>
                        <Typography
                          gutterBottom
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'info.main',
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
                            variant="outlined"
                            color="warning"
                            size="small"
                            sx={{
                              borderRadius: 1,
                              mr: 2,
                            }}
                          />
                          <Chip
                            label={item.category}
                            size="small"
                            sx={{
                              mr: 1.5,
                            }}
                          />
                          <Chip
                            label={item.sector}
                            size="small"
                            sx={{ px: 0.5 }}
                          />
                        </Stack>
                        <Typography color="text.primary">
                          Vol: {item.volume} | Val:{' '}
                          {(item.value / 10).toFixed(2)}
                          cr | Trd: {item.trade}
                        </Typography>
                      </Grid>

                      <Grid item xs={2.5}>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          sx={{ mr: 0.7 }}
                        >
                          <Typography
                            sx={{
                              fontSize: '1.5rem',
                              fontWeight: 500,
                              color:
                                item.change === 0
                                  ? 'primary.main'
                                  : item.change < 0
                                  ? 'error.main'
                                  : 'success.main',
                            }}
                          >
                            {item.ltp}
                          </Typography>
                          <Typography
                            sx={{ fontSize: '.85rem', ml: 0.5 }}
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
                                  ? 'primary.main'
                                  : item.change < 0
                                  ? 'error.main'
                                  : 'success.main',
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
                                    ? 'primary.main'
                                    : item.change < 0
                                    ? 'error.main'
                                    : 'success.main',
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '1.1rem' }}>
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
