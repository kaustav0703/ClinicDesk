"use client";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentMaker from "./AppointmentMaker";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentCalendar() {
  const [events, setEvents] = useState([
    { title: "Doctor Appointment", start: new Date(), end: new Date() },
  ]);

  const [isAppointmentCreate, setIsAppointmentCreate] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedSlot(slotInfo); // store date/time info
    setIsAppointmentCreate(true); // open modal
  };

  const handleSelectEvent = (event: any) => {
    console.log("Event clicked:", event);
    alert(`Event: ${event.title}`);
  };

  const handleSaveAppointment = (title: string) => {
    if (title && selectedSlot) {
      setEvents([
        ...events,
        { title, start: selectedSlot.start, end: selectedSlot.end },
      ]);
    }
    setIsAppointmentCreate(false);
    setSelectedSlot(null);
  };

  return (
    <div className="relative w-[80%] mb-10" id="appointments">
      {isAppointmentCreate && (
        <AppointmentMaker
          slotInfo={selectedSlot}
          onSave={handleSaveAppointment}
          onClose={() => setIsAppointmentCreate(false)}
        />
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 600 }}
      />
    </div>
  );
}
