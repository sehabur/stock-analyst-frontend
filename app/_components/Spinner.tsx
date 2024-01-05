import { CircularProgress, Dialog, Box, Backdrop } from '@mui/material';

const Spinner = (props: any) => {
  return (
    // <Backdrop open={true}>
    //   <CircularProgress color="primary" />
    // </Backdrop>
    <Dialog open={true}>
      <Box sx={{ p: 2.2, pb: 1.5 }}>
        <CircularProgress color="primary" />
      </Box>
    </Dialog>
  );
};

export default Spinner;
