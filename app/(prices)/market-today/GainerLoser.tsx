'use client';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart';
import {
  Box,
  Grid,
  useTheme,
  Typography,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function GainerLoser({ data }: any) {
  const theme = useTheme();

  const dataFormatter = (inputdata: any) => {
    let dataPoints = [];
    let categories = [];
    for (let item of inputdata) {
      categories.push(item.tradingCode);
      dataPoints.push(item.percentChange);
    }
    return { dataPoints, categories };
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: 'background.default', pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
              color="text.secondary"
            >
              Daily top gainer
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=gainer&variant=1d"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>

          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.success.main}
            data={dataFormatter(data.gainerDaily)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: 'background.default', pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
              color="text.secondary"
            >
              Yearly top gainer
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=gainer&variant=1y"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>

          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.success.main}
            data={dataFormatter(data.gainerOneYear)}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: 'background.default', px: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
              color="text.secondary"
            >
              All time top gainer
            </Typography>
          </Box>
          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor="#00A25B"
            data={dataFormatter(data.gainerAlltime)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: 'background.default', pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
              color="text.secondary"
            >
              Daily top loser
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=loser&variant=1d"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>

          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.error.main}
            data={dataFormatter(data.loserDaily)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: 'background.default', pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
              color="text.secondary"
            >
              Yearly top loser
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=loser&variant=1y"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>
          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.error.light}
            data={dataFormatter(data.loserOneYear)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: 'background.default', pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
              color="text.secondary"
            >
              All time top loser
            </Typography>
          </Box>
          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.error.light}
            data={dataFormatter(data.loserAlltime)}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
