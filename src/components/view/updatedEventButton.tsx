import React, { useContext, useState } from "react";
import { EventModelContext } from "@/components/model/eventModel";
import { EventControllerContext } from "@/components/controller/eventController";
import { updateEventDates } from "../controller/util/updateEventDates";


interface UpdateEventProps {}

const UpdateEventButton: React.FC<UpdateEventProps> = () => {
  const { events, setEvents } = useContext(EventModelContext);
  const { notifyUpdateEvent } = useContext(EventControllerContext);

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [newStartDate, setNewStartDate] = useState<Date>(new Date());
  const [newEndDate, setNewEndDate] = useState<Date>(new Date());

  const handleDateChange = () => {
    if (selectedEvent) {
      const updatedEvents = updateEventDates(
        events,
        newStartDate,
        newEndDate
      );
      setEvents(updatedEvents);
      notifyUpdateEvent(selectedEvent.id, newStartDate, newEndDate);
    }
  };

 
  const onStartDateChange = (e: any) => {
    setNewStartDate(new Date(e.target.value));
  };

  const onEndDateChange = (e: any) => {
    setNewEndDate(new Date(e.target.value));
  };

  return (
    <div>
    {selectedEvent ? (
      <>
        <h2>Activité est : {selectedEvent.title}</h2>
        <label htmlFor="start">Date et heure de début:</label>
        <input
          type="datetime-local"
          id="start"
          value={newStartDate.toISOString()}
          onChange={onStartDateChange}
        />
        <label htmlFor="end">Date et heure de fin:</label>
        <input
          type="datetime-local"
          id="end"
          value={newEndDate.toISOString()}
          onChange={onEndDateChange}
        />
        <br />
        <button onClick={handleDateChange}>Changer les dates</button>
      </>
    ) : (
      <p>No event selected</p>
    )}
  </div>
  
  );
};

export default UpdateEventButton;