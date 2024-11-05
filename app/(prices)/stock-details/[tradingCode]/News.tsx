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
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ReactTimeAgo from "react-time-ago";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { DateTime } from "luxon";

// interface NewsData {
//   title: string;
//   date: any;
//   description: string;
// }

export default function News({ news }: any) {
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
        disableScrollLock={true}
      >
        <DialogTitle
          sx={{
            mr: 3,
          }}
        >
          {dialogContent?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <ScheduleRoundedIcon
              color="success"
              sx={{ fontSize: "1.2rem", mr: 1.3 }}
            />
            <ReactTimeAgo
              date={dialogContent?.date}
              locale="en-US"
              style={{ fontSize: "1rem", color: "#089981" }}
            />
          </Stack>
          <Typography sx={{ pb: 2 }}>{dialogContent?.description}</Typography>
        </DialogContent>

        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 6,
            top: 6,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>

      <Box
        sx={{
          maxWidth: "1250px",
          mx: "auto",
          py: { xs: 2, sm: 4 },
          px: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          columnSpacing={{ xs: 1.5, sm: 2 }}
          rowSpacing={{ xs: 1.5, sm: 3 }}
        >
          {news.map((item: any) => (
            <Grid item xs={12} sm={4} key={item._id}>
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 1,
                  bgcolor: "gainerCardBackground",
                }}
                variant="outlined"
              >
                <CardContent sx={{ pb: 1 }}>
                  <Typography
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <Stack direction="row" alignItems="center">
                      <ScheduleRoundedIcon
                        color="success"
                        sx={{ fontSize: "1.2rem", mr: 1.3 }}
                      />
                      <ReactTimeAgo
                        date={item.time || item.date}
                        locale="en-US"
                        style={{ fontSize: "1rem", color: "#089981" }}
                      />
                      <Chip
                        label={DateTime.fromISO(item.date).toFormat(
                          "dd MMM, yyyy"
                        )}
                        size="small"
                        sx={{
                          ml: 2,
                          borderRadius: 1,
                          fontSize: ".9rem",
                        }}
                      />
                    </Stack>
                  </Typography>
                  <Typography sx={{ fontSize: ".875rem" }}>
                    {item.description.slice(0, 130) +
                      (item.description.length > 130 ? ".." : "")}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, pl: 1.5 }}>
                  <Button
                    size="small"
                    disableRipple
                    endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
                    onClick={() => handleItemClick(item)}
                    sx={{ ":hover": { bgcolor: "transparent" } }}
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
