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
  Zoom,
  Fade,
} from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { fundamentalsTooltip } from '@/data/info';

import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

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

  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      // backgroundColor: '#f5f5f9',
      // color: 'rgba(0, 0, 0, 0.87)',
      // border: '1px solid #dadde9',
      maxWidth: 500,
      fontSize: 14,
      padding: '12px',
    },
  }));

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
          '& .MuiCardContent-root:last-child': { pb: 0.3 },
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
              // component={Button}
              // disableRipple
              onClick={() => handleItemClick(dialogtype)}
              color="primary.main"
              sx={{
                textAlign: 'left',
                fontSize: '.92rem',
                fontWeight: 700,
                p: 0,
                m: 0,
                ':hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                },
              }}
            >
              {matchesSmUp ? title : titleShort}
            </Typography>
            <CustomTooltip
              placement="top"
              title={fundamentalsTooltip[dialogtype]?.definition}
            >
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
            </CustomTooltip>
          </Stack>
          <Box>
            <Stack
              direction={matchesSmUp ? 'row' : 'column'}
              alignItems={matchesSmUp ? 'center' : 'flex-start'}
              // justifyContent={matchesSmUp ? 'flex-start' : 'flex-start'}
              sx={{
                px: 2,
                py: 0,
                mx: 0,
                mt: 0.8,
                mb: 0.5,
                ':hover': {
                  bgcolor: 'transparent',
                },
              }}
              component={Button}
              disableRipple
              onClick={() => handleItemClick(dialogtype)}
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
            </Stack>
            <Divider light />
            <Typography
              component={Button}
              disableRipple
              onClick={() => handleItemClick(dialogtype)}
              sx={{
                color: data.color,
                fontSize: '.9rem',
                fontWeight: 500,
                px: 2,
                py: 1,
                ':hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              {data.comment}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
