/**
 * @fileoverview This component takes care of the Calender function.
 *
 */
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import "./Calendar.css";
import { useEffect, useRef, useState } from "react";
import { db } from "../../backend/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../store/authSlice";
import { selectUserInfoDetails } from "../../store/userInfoSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles({
  root: {
    // input label when focused
    "& label.Mui-focused": {
      color: "var(--primary-main)",
    },
  },
});

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: "var(--text-inactive)",
        },
        root: {
          "&.Mui-focused": {
            color: "yellow",
          },
        },
      },
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",
  bgcolor: "var(--background-secondary)",
  boxShadow: "0px 0px 2px 2px var(--background-secondary)",
  p: 3,
  overflowY: "scroll",
  borderRadius: "10px",
};

// const events = [
//   {
//     title: "event 1",
//     start: "2022-03-21",
//     end: "2022-03-22",
//     allDay: true,
//     description: "event 1 description",
//     note: "event 1 note",
//   },
//   {
//     title: "test event",
//     start: "2022-03-13",
//     end: "2022-03-14",
//     allDay: true,
//     description: "test event description",
//     note: "test event note",
//   },
// ];

/**
 * This component is what allows the Calender feature to work. Below are many consts and
 * handlers to handle selecting the dates.
 *
 * @returns {JSX.Element}
 */

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [clickedEvent, setClickedEvent] = useState(null);

  // Needs the empty object {} ==> or it will fail fo push new object to array
  const [appointmentList, setAppointmentList] = useState([{}]);

  const calendarRef = useRef();
  const classes = useStyles();

  const doctorEmail = useSelector(selectUserEmail);
  const doctorInfo = useSelector(selectUserInfoDetails);
  const patientList = doctorInfo?.treats;

  // const handleDateClick = (event) => {
  //   console.log("Date clicked: ", event);
  // };

  useEffect(() => {
    // If the patientList of this doctor is not empty,
    if (patientList) {
      // Go through each patient email, create a collection ref, & get all the appointments
      patientList.forEach((patientEmail) => {
        const appointmentRef = collection(
          db,
          `DoctorPatient/${doctorEmail};${patientEmail}/AppointmentHistory`
        );
        const getAppointmentList = async () => {
          const querySnapshot = await getDocs(appointmentRef);
          querySnapshot?.forEach((doc) => {
            // console.log(doc.id, doc.data());
            setAppointmentList((appointmentList) => [
              ...appointmentList,
              {
                id: doc.id,
                title: doc.data().title,
                start: doc.data().startDate,
                end: doc.data().endDate,
                confirmation: doc.data().confirmation,
                description: doc.data().description,
                finish: doc.data().finish,
                location: doc.data().location,
                note: doc.data().note,
              },
            ]);
          });
        };
        getAppointmentList();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render list of available patients that are assigned to this doctor
  const renderPatientList = () => {
    if (patientList) {
      return patientList.map((patient) => {
        return (
          <MenuItem key={patient} value={patient}>
            {patient}
          </MenuItem>
        );
      });
    }
  };

  const handleSelectedDate = (event) => {
    // console.log("Selected date: ", event);

    // Save the start & end date user just selected first
    setStartDate(event?.startStr);
    setEndDate(event?.endStr);

    // Open event modal to save the rest of the info
    setModalOpen(true);
  };

  const handleCreateAppointment = async (event) => {
    event.preventDefault();

    // Submit basic appointment info to database
    await setDoc(doc(db, `DoctorPatient/${doctorEmail};${selectedPatient}`), {
      doctor: doctorEmail,
      patient: selectedPatient,
      createdOn: serverTimestamp(),
    });

    // Submit appointment details into Appointment History queue (sub-collection)
    await addDoc(
      collection(
        db,
        `DoctorPatient/${doctorEmail};${selectedPatient}/AppointmentHistory`
      ),
      {
        startDate: startDate,
        endDate: endDate,
        title: title,
        description: description,
        location: location,
        note: note,
        confirmation: false,
        finish: false,
      }
    );

    // Close the modal after user create the event
    setModalOpen(false);

    // Refresh page after user submit the form
    window.location.reload();
  };

  const handleEventClick = (event) => {
    console.log("Event clicked: ", event.event);
    setClickedEvent({ ...event.event._def, ...event.event._instance });
    setEventModalOpen(true);
  };

  return (
    <>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          resourceTimeGridPlugin,
        ]}
        initialView="dayGridMonth"
        displayEventTime={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        ref={calendarRef}
        selectable={true}
        events={appointmentList}
        // events={events}
        eventClick={handleEventClick}
        // dateClick={handleDateClick}
        select={handleSelectedDate}
      />

      <ThemeProvider theme={theme}>
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <Box
            sx={style}
            component="form"
            noValidate
            onSubmit={handleCreateAppointment}
            color="var(--text-primary)"
            maxWidth={600}
          >
            <Typography
              variant="h4"
              component="h2"
              className="calendar-createAppointmentTitle"
            >
              Create new appointment
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  fullWidth
                  id="title"
                  label="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  sx={{
                    input: {
                      background: "#262626",
                      borderRadius: "5px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  fullWidth
                  id="description"
                  label="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  sx={{
                    input: {
                      background: "#262626",
                      borderRadius: "5px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  fullWidth
                  id="location"
                  label="Location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  sx={{
                    input: {
                      background: "#262626",
                      borderRadius: "5px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  fullWidth
                  id="note"
                  label="Note"
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  sx={{
                    input: {
                      background: "#262626",
                      borderRadius: "5px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 200,
                    background: "#262626",
                    borderRadius: "5px",
                    marginBottom: "25px",
                  }}
                >
                  <InputLabel
                    sx={{
                      color: "var(--text-primary)",
                    }}
                  >
                    Select Patient
                  </InputLabel>
                  <Select
                    value={selectedPatient}
                    onChange={(e) => {
                      setSelectedPatient(e.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {renderPatientList()}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              className="calendar-updateButton"
              disabled={selectedPatient === ""}
            >
              CREATE APPOINTMENT
            </Button>
            <Button
              type="submit"
              variant="outlined"
              className="calendar-cancelButton"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              CANCEL
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>

      {clickedEvent && (
        <>
          <ThemeProvider theme={theme}>
            <Modal
              open={eventModalOpen}
              onClose={() => {
                setEventModalOpen(false);
              }}
            >
              <Box
                sx={style}
                component="form"
                noValidate
                color="var(--text-primary)"
                maxWidth={600}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  className="calendar-createAppointmentTitle"
                >
                  Selected event info
                </Typography>

                <h4>Title: {clickedEvent.title}</h4>
                <h4>Date: {new Date(clickedEvent.range.end).toDateString()}</h4>
                <h4>
                  Confirmed:{" "}
                  {clickedEvent.extendedProps.confirmation ? "No" : "Yes"}
                </h4>
                <h4>
                  Finished: {clickedEvent.extendedProps.finish ? "No" : "Yes"}
                </h4>
                <h4>Description: {clickedEvent.extendedProps.description}</h4>
                <h4>Location: {clickedEvent.extendedProps.location}</h4>
                <h4>Note: {clickedEvent.extendedProps.note}</h4>
              </Box>
            </Modal>
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default Calendar;
