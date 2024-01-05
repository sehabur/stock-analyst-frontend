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

export default function FundamentalInfoCard(props: any) {
  const { text } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Card
        elevation={0}
        sx={{
          bgcolor: 'secondaryBackground',
          mx: { xs: 0, sm: 2 },
          mb: 2,
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            {matchesSmUp && <InfoIcon color="info" />}
            <Typography>
              {text}
              <Typography
                component={Link}
                target="_blank"
                href="#"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'underline',
                  ml: 1,
                }}
              >
                Learn more
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
