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

const events = [
  { date: "2022-01-02"},
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
  const handleDateClick = (event) => {
    alert("Date selected!");
    // console.log(event);
  };

  const handleEventClick = (event) => {
    console.log(event.event);
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
      selectable={true}
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
