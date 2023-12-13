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
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ReactTimeAgo from 'react-time-ago';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function News({ data }: any) {
  const [openDialog, setOpenDialog] = useState(false);

  const [dialogContent, setDialogContent] = useState<any>({});

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleItemClick = (item: {}) => {
    handleDialogOpen();
    setDialogContent(item);
  };

  return (
    <Box>
      <Dialog
        onClose={handleDialogClose}
        open={openDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.3jhjrem' }}>
          {dialogContent?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <ScheduleRoundedIcon
              color="success"
              sx={{ fontSize: '1.2rem', mr: 1.3 }}
            />
            <ReactTimeAgo
              date={dialogContent?.date}
              locale="en-US"
              style={{ fontSize: '1rem', color: '#089981' }}
            />
          </Stack>
          <Typography sx={{ fontSize: '1rem', pb: 2 }}>
            {dialogContent?.description}
          </Typography>
        </DialogContent>

        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: 'absolute',
            right: 4,
            top: 4,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>

      <Box
        sx={{
          maxWidth: '1250px',
          mx: 'auto',
          py: { xs: 2, sm: 4 },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          {data.map((item: any) => (
            <Grid item xs={12} sm={4} key={item._id}>
              <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardContent sx={{ pb: 0 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <Stack direction="row" alignItems="center">
                      <ScheduleRoundedIcon
                        color="success"
                        sx={{ fontSize: '1.1rem', mr: 1.3 }}
                      />
                      <ReactTimeAgo
                        date={item.date}
                        locale="en-US"
                        style={{ color: '#089981' }}
                      />
                    </Stack>
                  </Typography>
                  <Typography>
                    {item.description.slice(0, 135) +
                      (item.description.length > 135 ? '..' : '')}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, pl: 1.5 }}>
                  <Button
                    size="small"
                    endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
                    onClick={() => handleItemClick(item)}
                  >
                    Read more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
