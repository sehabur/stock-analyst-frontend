"use client";
import { useState } from "react";

import Link from "next/link";

import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ReactTimeAgo from "react-time-ago";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import CardActionArea from "@mui/material/CardActionArea";

import SeeMoreButton from "@/components/buttons/SeeMoreButton";

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
    title: "Financials",
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
    marginRight: "12px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "16px",
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingRight: "16px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
  // fontSize: ".9rem",
  // textTransform: "none",
}));

export default function News({ data }: any) {
  const [openDialog, setOpenDialog] = useState(false);

  const [dialogContent, setDialogContent] = useState<any>({});

  const [news, setNews] = useState<any>(data);

  const [alignment, setAlignment] = useState(" ");

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);

      let text = new RegExp(newAlignment, "i");

      const newData = data.filter((item: any) => {
        const position =
          newAlignment === "Q[0-9]"
            ? item.title.search(text)
            : item.description.search(text);
        if (position !== -1) return item;
      });
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
    <Box sx={{ mx: { xs: 2, sm: 0 } }}>
      <Dialog
        onClose={handleDialogClose}
        open={openDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.3rem" }}>
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
          py: { xs: 2, sm: 2 },
          mr: { xs: 0, sm: 4 },
        }}
      >
        <Button
          component={Link}
          href="/latest-news"
          color="primary"
          endIcon={<ArrowForwardIosRoundedIcon />}
          sx={{
            fontSize: "1.6rem",
            fontWeight: 700,
            mb: 1,
            pl: 0.3,
            ":hover": {
              bgcolor: "transparent",
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
        >
          Latest News
        </Button>
        <Box
          sx={{
            mb: { xs: 1, sm: 1 },
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
        <Box>
          {news.slice(0, 4).map((item: any) => (
            <Card
              sx={{ minWidth: 275, my: 1, borderRadius: 2 }}
              variant="outlined"
              elevation={0}
              key={item._id}
            >
              <CardActionArea onClick={() => handleItemClick(item)}>
                <CardContent sx={{ py: 1 }}>
                  <Typography noWrap sx={{ fontWeight: 700, fontSize: "1rem" }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    <Stack direction="row" alignItems="center">
                      <ScheduleRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem", mr: 1.3 }}
                      />
                      <ReactTimeAgo
                        date={item.time || item.date}
                        locale="en-US"
                        style={{ color: "#089981" }}
                      />
                    </Stack>
                  </Typography>
                  <Typography>
                    {item.description.slice(0, 140) +
                      (item.description.length > 140 ? ".." : "")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <SeeMoreButton href="/latest-news" />
      </Box>
    </Box>
  );
}
