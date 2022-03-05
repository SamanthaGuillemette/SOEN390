import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Divider } from '@mui/material';
import "./Notifications.css";

const Notifications = () => {
    return (
        <>
            <div className="container">
                <Card className="notifications-box">
                    <CardContent
                        sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: "30px",
                        mb: "20px",
                        }}
                    >
                    <Box>
                        <Box>
                            <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                            >
                                <CoronavirusIcon color="error" sx={{ fontSize: 40 }} />
                                <Typography style={{ marginLeft: '10px', }}>
                                    You have been exposed to COVID-19
                                </Typography>
                            </Box>
                            <Typography style={{ marginLeft: '50px', }}>
                                Based on the address information you have provied, you have been near someone in the past 14 days who tested positive for COVID-19.
                            </Typography>
                            <Divider/>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                            >
                                <CoronavirusIcon color="success" sx={{ fontSize: 40 }} />
                                <Typography style={{ marginLeft: '10px', }}>
                                    No exposure detected
                                </Typography>
                            </Box>
                            <Typography style={{ marginLeft: '50px', }}>
                                Based on the address information you have provied, you have not been near anyone who reported a COVID-19 diagnosis through this app.
                            </Typography>
                            <Divider/>
                        </Box>
                    </Box>
                </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Notifications;
