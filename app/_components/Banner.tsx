'use client';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { themeColorActions } from '_store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Banner() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const secondColor = theme.palette.mode === 'light' ? '#F0F7FF ' : '#162055';

  // useEffect(() => {
  //   dispatch(themeColorActions.setThemeColor('dark'));

  //   return () => {
  //     dispatch(themeColorActions.setThemeColor('light'));
  //   };
  // }, [dispatch]);

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(${theme.palette.background.default}, ${secondColor})`,
        height: { xs: '300px', sm: '600px' },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'contain',
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: 800 }}>
        <Typography
          component="div"
          sx={{ fontSize: '3.8rem', fontWeight: 700, lineHeight: 1.1 }}
          color="text.primary"
        >
          Know your stock first, then trade
        </Typography>
        <Typography
          component="div"
          sx={{ fontSize: '1.6rem', my: 5 }}
          color="text.secondary"
        >
          Get prepared analytics and scores for shares helping you find the
          perfect trade. Suitable for investors will all skill levels
        </Typography>
        <Button
          variant="contained"
          sx={{ fontSize: '1.3rem', borderRadius: 6, px: 5, py: 1, mr: 4 }}
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: '1.3rem', borderRadius: 6, py: 1, px: 5 }}
        >
          Create new Account
        </Button>
      </Box>
    </Box>
  );
}
