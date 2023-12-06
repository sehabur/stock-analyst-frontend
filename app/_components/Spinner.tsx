import { CircularProgress, Dialog, Box } from '@mui/material';

const Spinner = (props: any) => {
  return (
    <Dialog open={true}>
      <Box sx={{ p: 2.2, pb: 1.5 }}>
        <CircularProgress color="primary" />
      </Box>
    </Dialog>
  );
};

export default Spinner;
