'use client';
import {
  Paper,
  Grid,
  Typography,
  Stack,
  Button,
  Chip,
  Popover,
  Box,
} from '@mui/material';
import Link from 'next/link';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useState } from 'react';
// import { green, blue, red } from '@mui/material/colors';

export default function SectorSummaryCard({ data }: { data: any }) {
  const sectorTag = data.sector.split(' ')[0].toLowerCase();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [type, setType] = useState<any>('uptrendItems');

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
  const id = open ? 'simple-popover' : undefined;

  const textColor =
    data.change === 0
      ? 'primary.main'
      : data.change < 0
      ? 'error.main'
      : 'success.main';

  return (
    <>
      <Paper
        sx={{
          // bgcolor: blue[50],
          width: 360,
          my: { xs: 1, sm: 2 },
          mx: { xs: 0, sm: 1.5 },
          p: 2,
        }}
        variant="outlined"
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={9.2}>
            <Typography
              gutterBottom
              color={textColor}
              sx={{ fontSize: '1.15rem' }}
            >
              {data.sector}
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              Total value: {(data.valueTotal / 10).toFixed(3)} crore
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ my: 1.2 }}>
              <Box
                component={Button}
                onClick={(e) => handleClick(e, 'uptrendItems')}
                sx={{
                  m: 0,
                  p: 0,
                  ':hover': {
                    background: 'transparent',
                  },
                }}
              >
                <KeyboardDoubleArrowUpIcon
                  sx={{ color: 'success.main', fontSize: '1.3rem' }}
                />
                <Typography
                  sx={{ color: 'success.main', mr: 3, fontSize: '1.3rem' }}
                >
                  {data.uptrend}
                </Typography>
              </Box>

              <Box
                component={Button}
                onClick={(e) => handleClick(e, 'neutralItems')}
                sx={{
                  m: 0,
                  p: 0,
                  ':hover': {
                    background: 'transparent',
                  },
                }}
              >
                <PauseCircleOutlineIcon
                  sx={{ color: 'primary.main', mr: 0.5, fontSize: '1.3rem' }}
                />
                <Typography
                  sx={{ color: 'primary.main', mr: 1, fontSize: '1.3rem' }}
                >
                  {data.neutral}
                </Typography>
              </Box>
              <Box
                component={Button}
                onClick={(e) => handleClick(e, 'downtrendItems')}
                sx={{
                  m: 0,
                  p: 0,
                  ':hover': {
                    background: 'transparent',
                  },
                }}
              >
                <KeyboardDoubleArrowDownIcon
                  sx={{ color: 'error.main', fontSize: '1.3rem' }}
                />
                <Typography sx={{ color: 'error.main', fontSize: '1.3rem' }}>
                  {data.downtrend}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={2.8}>
            <Typography
              sx={{
                fontSize: '1.6rem',
                color:
                  data.change == 0
                    ? 'primary.main'
                    : data.change < 0
                    ? 'error.main'
                    : 'success.main',
              }}
            >
              {data.ltp}
            </Typography>
            <Chip
              label={data.change}
              size="small"
              sx={{
                fontSize: '.9rem',
                borderRadius: 1,
                color: textColor,
              }}
            />
            {data.change !== 0 && (
              <Chip
                label={data.percentChange + '%'}
                size="small"
                sx={{
                  fontSize: '.9rem',
                  borderRadius: 1,
                  mt: 1,
                  color: textColor,
                }}
              />
            )}
          </Grid>
        </Grid>
        <Button
          component={Link}
          href={`/sector/chart?sector=${sectorTag}`}
          variant="outlined"
          size="small"
          color="info"
          sx={{ fontSize: '.9rem', mr: 2 }}
        >
          See chart
        </Button>
        <Button
          component={Link}
          href={`/latest-price?sector=${sectorTag}`}
          variant="outlined"
          size="small"
          color="info"
          sx={{ fontSize: '.9rem', mr: 2 }}
        >
          Stock lists
        </Button>
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        sx={{ maxHeight: 550 }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          {data[type]
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
                  display: 'block',
                  fontSize: '.85rem',
                  ':hover': {
                    background: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                {item}
              </Button>
            ))}
        </Box>
      </Popover>
    </>
  );
}
