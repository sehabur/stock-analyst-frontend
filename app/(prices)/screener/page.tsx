import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tab,
  Tabs,
  Divider,
  TextField,
} from '@mui/material';
import Main from './Main';

export default async function Screener() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: 1350,
          mx: 'auto',
          px: 2,
        }}
      >
        <Main />
      </Box>
    </Box>
  );
}
