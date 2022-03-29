/**
 * @fileoverview This component takes care of the Notifications function.
 *
 */
import "./Notifications.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import { Divider } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector } from "react-redux";
import { getStatusNotificationsTable } from "../../backend/firebaseDoctorUtilities";

/**
 * This component is what allows the Notifications feature to work.
 */


const Notifications = () => {
    
    const userInfoDetails = useSelector((state) => state.userInfo.userInfoDetails);

    return (
        <>
            <div className="ADMIN-NOTIFICATIONS__container">
                <Card className="ADMIN-NOTIFICATIONS__box">
                    <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
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
                                <Box style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}
                                >
                                    <ReplayIcon color="success" sx={{ fontSize: 40 }} />
                                    <Typography
                                        style={{
                                            marginLeft: '10px',
                                        }}
                                        color="var(--text-primary)"
                                    >
                                        <b>Status Re-Update</b>
                                    </Typography>
                                    <CloseIcon className="NOTIFICATIONS__closingIcon"/>
                                </Box>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '20px'
                                    }}
                                    color="var(--text-primary)"
                                >
                                    Shakira re-updated her status. Please check the status update for more information.
                                </Typography>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '30px'
                                    }}
                                    color="#949be2"
                                    data-testid="notification-statusUpdate"
                                >
                                    22 March, 2022. At 6:30 pm.
                                </Typography>
                                <Divider color="#949be2" />
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
                                    <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                                    <Typography
                                        style={{
                                            marginLeft: '10px',
                                        }}
                                        color="var(--text-primary)"
                                    >
                                        <b>Status Update</b>
                                    </Typography>
                                    <CloseIcon className="NOTIFICATIONS__closingIcon"/>
                                </Box>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '20px'
                                    }}
                                    color="var(--text-primary)"
                                >
                                    Shakira updated her status. Please check the status update for more information.
                                </Typography>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '30px'
                                    }}
                                    color="#949be2"
                                    data-testid="notification-statusUpdate"
                                >
                                    22 March, 2022. At 5:50 pm.
                                </Typography>
                                <Divider color="#949be2" />
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
                                    <CoronavirusIcon color="error" sx={{ fontSize: 40 }} />
                                    <Typography
                                        style={{
                                            marginLeft: '10px',
                                        }}
                                        color="var(--text-primary)"
                                    >
                                        <b>New Case Reported</b>
                                    </Typography>
                                    <CloseIcon className="NOTIFICATIONS__closingIcon " />
                                </Box>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '30px'
                                    }}
                                    color="var(--text-primary)"
                                >
                                    A new patient was tested positive, please check the patient's information and status for more information.
                                </Typography>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '30px'
                                    }}
                                    color="#949be2"
                                >
                                    22 January, 2022. At 4:20 pm.
                                </Typography>
                                <Divider color="#949be2" />
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
                                    <ReportIcon color="error" sx={{ fontSize: 40 }} />
                                    <Typography
                                        style={{
                                            marginLeft: '10px',
                                        }}
                                        color="var(--text-primary)"
                                    >
                                        <b>Urgent Case</b>
                                    </Typography>
                                    <CloseIcon className="NOTIFICATIONS__closingIcon" />
                                </Box>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '30px'
                                    }}
                                    color="var(--text-primary)"
                                >
                                    Your patient Micheal Kors is requesting an urgent status review. Please check the inbox messages for more information. 
                                </Typography>
                                <Typography
                                    style={{
                                        marginLeft: '50px',
                                        marginBottom: '30px'
                                    }}
                                    color="#949be2"
                                >
                                    1 January, 2022. At 3:20 pm.
                                </Typography>
                                <Divider color="#949be2" />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Notifications;

