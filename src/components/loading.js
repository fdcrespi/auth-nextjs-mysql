import { Box, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
   return (
    <Box sx={{ width: '40%', m: 'auto'}}>
      <Typography component="h1" variant="h5"
        sx={{
          textAlign: 'center',
          mb: 2
        }}
      >
        Cargando...
      </Typography>
      <LinearProgress color="success" />
    </Box>
  );
};

export default Loading;