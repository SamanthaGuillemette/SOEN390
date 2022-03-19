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
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../backend/firebase";
import { collection, doc } from "firebase/firestore";

const events = [
  {
    title: "event 1",
    start: "2022-03-21",
    end: "2022-03-22",
    allDay: true,
    description: "event 1 description",
    note: "event 1 note",
  },
  {
    title: "test event",
    start: "2022-03-13",
    end: "2022-03-14",
    allDay: true,
    description: "test event description",
    note: "test event note",
  },
];

/**
 * This component is what allows the Calender feature to work. Below are many consts and
 * handlers to handle selecting the dates.
 *
 * @returns {JSX.Element}
 */

const Calendar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [finish, setFinish] = useState(false);

  const calendarRef = useRef();

  const [user] = useAuthState(auth);
  const doctorEmail = user?.email;
  const clientEmail = "client.quang@gmail.com";

  // Get the client's reference via the userEmail (query the database)
  // const appointmentRef = collection(
  //   db,
  //   `Appointment/${doctorEmail}&${clientEmail}`
  // );

  const [modalOpen, setModalOpen] = useState(false);

  // const handleDateClick = (event) => {
  //   console.log("Date clicked: ", event);
  //   alert("Date selected!");
  //   console.log(event.date);
  //   console.log(event.dateStr);
  //   // alert("selected " + event.startStr + " to " + event.endStr);
  //   const title = prompt("Appointment title: ");
  //   const details = prompt("Appointment description: ");
  //   // if (title != null) {
  //   setTitle(title);
  //   setDetails(details);
  //   setStart(event.dateStr);
  //   // } else {
  //   //   console.log("nothing");
  //   // }
  //   console.log(title);
  //   console.log(details);
  //   console.log(start);
  // };

  const handleSelectedDate = (event) => {
    console.log("Selected date: ", event);

    let title = prompt("Appointment title: ");
    let description = prompt("Appointment description: ");
    let location = prompt("Appointment location: ");
    let note = prompt("Appointment note: ");

    // Only set other fields if title is not empty
    if (title != null) {
      setTitle(title);
      setDescription(description);
      setStartDate(event?.startStr);
      setEndDate(event?.endStr);
      setLocation(location);
      setNote(note);
    } else {
      alert("Failed to create new event!");
    }
  };

  const handleEventClick = (event) => {
    console.log("Event clicked: ", event);
    console.log("==> ", event.event._def.extendedProps.note);
  };

  return (
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
      events={events}
      eventClick={handleEventClick}
      // dateClick={handleDateClick}
      select={handleSelectedDate}
    />
  );
};

export default Calendar;
