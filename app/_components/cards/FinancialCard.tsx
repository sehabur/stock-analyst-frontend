'use client';

import {
  Box,
  Grid,
  Typography,
  Stack,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  Slider,
  Divider,
} from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

export default function FinancialCard(props: any) {
  const {
    data,
    title,
    unit = '',
    divideFactor = 1,
    titleShort,
    dialogtype,
    handleItemClick,
  } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Card
        // variant="outlined"
        elevation={0}
        sx={{
          '& .MuiCard-root': {
            '& :hover': {
              bgcolor: 'transparent',
            },
          },
          '& .MuiCardContent-root': { pb: 0.3 },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ bgcolor: 'financeCardTitlecolor', px: 2, py: 1.2 }}
          >
            <Typography
              component={Button}
              disableRipple
              onClick={() => handleItemClick(dialogtype)}
              color="primary.main"
              sx={{
                fontSize: '.92rem',
                fontWeight: 700,
                p: 0,
                m: 0,
                ':hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              {matchesSmUp ? title : titleShort}
            </Typography>
            <IconButton
              disableRipple
              sx={{
                p: 0,
                m: 0,
                ':hover': {
                  bgcolor: 'transparent',
                  color: 'primary.main',
                },
              }}
            >
              <HelpOutlineRoundedIcon
                // color="info"
                sx={{ fontSize: '1.2rem' }}
              />
            </IconButton>
          </Stack>
          <Stack
            direction={matchesSmUp ? 'row' : 'column'}
            alignItems={matchesSmUp ? 'center' : 'flex-start'}
            // justifyContent={matchesSmUp ? 'flex-start' : 'flex-start'}
            sx={{ px: 2, mt: 0.8, mb: 0.5 }}
          >
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.8rem', fontWeight: 500 }}
              >
                {(data.value / divideFactor).toFixed(2)}
              </Typography>
              <Typography
                sx={{ fontSize: '1.1rem', ml: 0.5, color: 'text.secondary' }}
              >
                {unit}
              </Typography>
            </Stack>

            <Chip
              label={data.period}
              variant="outlined"
              size="small"
              // color="info"
              sx={{
                ml: { xs: 0, sm: 2 },
                fontSize: '1rem',
                fontWeight: 500,
                // borderRadius: 1.2,
              }}
            />
            {/* <Typography
                sx={{
                  ml: { xs: 0, sm: 2 },
                  fontSize: '.9rem',
                  fontWeight: 700,
                  // color: 'info.light',
                  color: 'text.secondary',
                }}
              >
                
              </Typography> */}
          </Stack>
          <Divider light />
          <Typography
            sx={{
              color: data.color,
              fontSize: '.9rem',
              fontWeight: 500,
              px: 2,
              py: 1,
            }}
          >
            {data.comment}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
