import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{ 
            width: '75%',
            bgcolor: 'background.paper',
            boxShadow: '1',
            borderRadius: '2',
            p: '2',
            textAlign: 'center',
            mx: 'auto',

        }}>
            <Box sx={{ color: 'text.primary' }}>Loading</Box>
            <LinearProgress />
        </Box>
    )
}

export default Loading;


