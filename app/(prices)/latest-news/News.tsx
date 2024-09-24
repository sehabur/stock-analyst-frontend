"use client";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
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

import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { DateTime } from "luxon";

const options: any = [
  {
    title: "All",
    search: " ",
  },
  {
    title: "EPS",
    search: "eps",
  },
  {
    title: "DIVIDEND",
    search: "dividend",
  },
  {
    title: "AGM",
    search: "agm",
  },
  {
    title: "RECORD DATE",
    search: "record date",
  },
  {
    title: "FINANCIALS",
    search: "Q[0-9]",
  },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 3,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "14px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "16px",
  },
  color: theme.palette.text.primary,
  // fontSize: ".9rem",
  // textTransform: "none",
}));

export default function News({ data }: any) {
  const [openDialog, setOpenDialog] = useState(false);

  const [dialogContent, setDialogContent] = useState<any>({});

  const [news, setNews] = useState<any>(data.slice(0, 300));

  const [alignment, setAlignment] = useState(" ");

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);

      let text = new RegExp(newAlignment, "i");

      const newData = data
        .filter((item: any) => {
          const position =
            newAlignment === "Q[0-9]"
              ? item.title.search(text)
              : item.description.search(text);
          if (position !== -1) return item;
        })
        .slice(0, 300);

      console.log(newData.length);
      setNews(newData);
    }
  };

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

  const handleDataChange = () => {};

  return (
    <Box>
      <Dialog
        onClose={handleDialogClose}
        open={openDialog}
        fullWidth
        maxWidth="sm"
        disableScrollLock={true}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.3jhjrem" }}>
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
          <Typography sx={{ fontSize: "1rem", pb: 2 }}>
            {dialogContent?.description}
          </Typography>
        </DialogContent>

        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 4,
            top: 4,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>

      <Box
        sx={{
          maxWidth: "1250px",
          mx: "auto",
          py: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: { xs: 2, sm: 2 },
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="Platform"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {options.map((item: any, index: number) => (
              <StyledToggleButton
                value={item.search}
                sx={{ px: 2, mb: 1 }}
                onClick={handleDataChange}
                key={index}
              >
                {item.title}
              </StyledToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={{ xs: 1.5, sm: 2.5 }}
        >
          {news.map((item: any) => (
            <Grid item xs={12} md={4} key={item._id}>
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 1,
                  bgcolor: "gainerCardBackground",
                }}
                variant="outlined"
                key={item._id}
              >
                <CardContent sx={{ pb: 0 }}>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <Stack direction="row" alignItems="center">
                      <ScheduleRoundedIcon
                        color="success"
                        sx={{ fontSize: "1.1rem", mr: 1.3 }}
                      />
                      <ReactTimeAgo
                        date={item.time || item.date}
                        locale="en-US"
                        style={{ color: "#089981" }}
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
                  <Typography>
                    {item.description.slice(0, 135) +
                      (item.description.length > 135 ? ".." : "")}
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
