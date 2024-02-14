import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tab,
  Tabs,
  Divider,
  TextField
} from '@mui/material'
import Main from './Main'

export default async function Screener () {
  return (
    <Box
      component='main'
      sx={{
        bgcolor: 'background.default'
      }}
    >
      <Main />
    </Box>
  )
}
