"use client";
import React from "react";

import {
  Box,
  Snackbar,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  useTheme,
  useMediaQuery,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FavoriteStocksCard from "@/components/cards/FavoriteStocksCard";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import { authActions } from "_store";
import ToastMessage from "@/components/shared/ToastMessage";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

export default function Favorites() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const auth = useSelector((state: any) => state.auth);

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const [favStock, setFavStock] = React.useState<any>([]);

  const [favStockCard, setFavStockCard] = React.useState([]);

  const [toastOpen, setToastOpen] = React.useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState("");

  const handleLogoutToastColse = () => {
    setToastOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddStock = (e: any, newvalue: any) => {
    setFavStock((prevstate: any) => [...prevstate, newvalue]);
  };

  const handleDeleteItem = (tradingCode: string) => {
    // const newFav = favStock.filter((item: any) => item.tradingCode !== tradingCode);
    setFavStock((prevstate: any) =>
      prevstate.filter((item: any) => item.tradingCode !== tradingCode)
    );
  };

  const handleSaveItems = async () => {
    const addItems = favStock.map((option: any) => option.tradingCode);

    try {
      const res = await fetch(`/api/favorite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          tradingCode: addItems,
          type: "bulk_add",
          userId: auth?._id,
        }),
      });
      const data = await res.json();
      dispatch(authActions.resetFavoritesWithNewValue(addItems));
      setToastOpen(true);
      setToastMessage("Items successfully added to favorites");
      setFavStockCard(favStock);
      handleDialogClose();
    } catch (error) {
      setToastOpen(true);
      setToastMessage("Something went wrong");
      handleDialogClose();
    }
  };

  React.useEffect(() => {
    const favs = latestPrice.filter((item: any) =>
      auth.favorites.includes(item.tradingCode)
    );
    setFavStock(favs);
    setFavStockCard(favs);
  }, [auth, latestPrice]);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        px: 2,
      }}
    >
      <ToastMessage
        open={toastOpen}
        onClose={handleLogoutToastColse}
        severity="success"
        message={toastMessage}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
          Edit my favorites
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ py: 2, px: { xs: 2, sm: 4 } }}>
            <Autocomplete
              onChange={handleAddStock}
              options={latestPrice}
              getOptionLabel={(option: any) => option.tradingCode}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Stock"
                  placeholder="Select to add items to your list"
                />
              )}
            />
            <List>
              {favStock?.map((stock: any, index: number) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon
                        onClick={() => handleDeleteItem(stock.tradingCode)}
                      />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <TurnedInNotRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={stock.tradingCode} />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions sx={{ py: 2 }}>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="warning"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveItems}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 4, mb: 1 }}>
        <Button
          startIcon={<EditNoteRoundedIcon />}
          sx={{
            px: 4,
            borderRadius: 6,
          }}
          onClick={() => setDialogOpen(true)}
          variant="outlined"
        >
          Edit my list
        </Button>
      </Box>
      <Box>
        {favStockCard?.map((stock: any) => (
          <Box sx={{ my: { xs: 1, sm: 1.7 } }}>
            <FavoriteStocksCard data={stock} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
