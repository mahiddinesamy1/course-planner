import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventModelContext } from '@/components/model/eventModel';
import { findEarliestEventDate } from '../controller/util/eventOperations';
import { EventControllerContext} from '../controller/eventController';
import UpdateEventButton from "./updatedEventButton";

const EventCalendar: React.FC = () => {
  const { events } = useContext(EventModelContext);
  const [selectedDate, setSelectedDate] = useState<Date>(findEarliestEventDate(events));
  const { setSelectedEvent } = useContext(EventControllerContext);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  
  

  useEffect(() => {
    setSelectedDate(findEarliestEventDate(events));
  }, [events]);

  const onNavigate = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const onSelectEvent = (event: any, e: any) => {
    setSelectedEvent(event);
  };

  const localizer = momentLocalizer(moment);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={selectedDate}
        onNavigate={onNavigate}
        onSelectEvent={onSelectEvent}
  
        selectable
      />
      <UpdateEventButton />
    </div>
  );
};

export default EventCalendar;
