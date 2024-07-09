import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { Box, Typography, Button } from '@mui/material';

export const Upgrade = () => {
    return (
        <Box
            display='flex'
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}
        >
            <>
                <Box >
                    <Typography variant="h5" sx={{width:"80px"}} fontSize='16px' mb={1}>Haven&apos;t account ?</Typography>
                    <Button color="primary" target="_blank" disableElevation component={RegisterLink} variant="contained" aria-label="logout" size="small">
                        Sign Up
                    </Button>
                </Box>
                <Box mt="-35px" >
                    {/* <Image alt="Remy Sharp" src='/images/backgrounds/rocket.png' width={100} height={100} /> */}
                </Box>
            </>
        </Box>
    );
};
