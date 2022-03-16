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

const events = [
  { date: "2022-01-02" },
  {
    start: "2022-01-21",
    end: "2022-01-22",
    allDay: true,
    HostName: "William",
  },
  {
    start: "2022-01-19",
    end: "2022-01-19",
    allDay: true,
  },
  {
    start: "2022-01-05",
    end: "2022-01-07",
    allDay: true,
  },
  {
    start: "2022-01-13",
    end: "2022-01-15",
    allDay: true,
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
  const [details, setDetails] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const calendarRef = useRef();

  const handleDateClick = (event) => {
    // alert("Date selected!");
    // console.log(event.date);
    // console.log(event.dateStr);
    // // alert("selected " + event.startStr + " to " + event.endStr);
    // const title = prompt("Appointment title: ");
    // const details = prompt("Appointment description: ");
    // // if (title != null) {
    // setTitle(title);
    // setDetails(details);
    // setStart(event.dateStr);
    // // } else {
    // //   console.log("nothing");
    // // }
    // console.log(title);
    // console.log(details);
    // console.log(start);
  };

  const handleSelectedDate = (event) => {
    alert("selected " + event.startStr + " to " + event.endStr);
    const title = prompt("Appointment title: ");
    const details = prompt("Appointment description: ");

    if (title != null) {
      setTitle(title);
      setDetails(details);
      setStart(event.startStr);
      setEnd(event.endStr);
    } else {
      console.log("No input");
    }
  };

  console.log(start);
  console.log(end);

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
      dateClick={handleDateClick}
      // eventClick={handleSelectedDate}
      select={handleSelectedDate}
    />
  );
};

export default Calendar;
