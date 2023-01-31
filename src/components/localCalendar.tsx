import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Event from '../model/event'

const LocalCalendar: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(JSON.parse(typeof window === "undefined" ? "[]" : localStorage.getItem('events') || "[]"));

    const updateStateOnStorageChange = (event: StorageEvent) => {
        if (event.key === "events") {
            setEvents(JSON.parse(event.newValue || ""));
        }
    };

    // use local storage state on mount and cleanup on unmount
    useEffect(() => {
        window.addEventListener("storage", updateStateOnStorageChange);
        return () => window.removeEventListener("storage", updateStateOnStorageChange);
    }, []);

    const localizer = momentLocalizer(moment);

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default LocalCalendar;
