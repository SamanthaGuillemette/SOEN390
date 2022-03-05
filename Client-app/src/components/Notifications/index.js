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
                    <Typography
                        sx={{
                        mx: "30px",
                        pb: "30px",
                        fontWeight: "800",
                        }}
                    color="var(--text-primary)"
                    variant="h5"
                    >
                    Notifications
                    </Typography>
                    <Box>
                        <Box>
                            <Divider color="#949be2"/>
                            <Box style={{
                                marginTop: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                            >
                                <CoronavirusIcon color="error" sx={{ fontSize: 40 }} />
                                <Typography 
                                    style={{ marginLeft: '10px', 
                                    }}
                                    color="var(--text-primary)"
                                    >
                                    You have been exposed to COVID-19
                                </Typography>
                            </Box>
                            <Typography 
                                style={{ marginLeft: '50px', 
                                         marginBottom: '30px' 
                                }}
                                color="var(--text-primary)" 
                                >
                                Based on the address information you have provied, you have been near someone in the past 14 days who tested positive for COVID-19.
                            </Typography>
                            <Divider color="#949be2"/>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Box style={{
                                marginTop: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                            >
                                <CoronavirusIcon color="success" sx={{ fontSize: 40 }} />
                                <Typography 
                                    style={{ 
                                        marginLeft: '10px', 
                                }}
                                color="var(--text-primary)"
                                >
                                    No exposure detected
                                </Typography>
                            </Box>
                            <Typography 
                                style={{ 
                                    marginLeft: '50px', 
                                    marginBottom: '30px' 
                                }}
                                color="var(--text-primary)"
                            >
                                Based on the address information you have provied, you have not been near anyone who reported a COVID-19 diagnosis through this app.
                            </Typography>
                            <Divider color="#949be2"/>
                        </Box>
                    </Box>
                </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Notifications;
