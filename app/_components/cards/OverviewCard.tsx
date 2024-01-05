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
} from '@mui/material';

import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import { grey } from '@mui/material/colors';

export default function OverviewCard(props: any) {
  const { title, data } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Card
        elevation={0}
        sx={{
          '& .MuiCardContent-root:last-child': { pb: 0 },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ bgcolor: 'overviewHeader', px: 2, py: 0.7 }}>
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'secondaryBackground', px: 2, py: 0.5 }}>
            <Typography sx={{ fontSize: '1.7rem', fontWeight: 500 }}>
              {data}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
