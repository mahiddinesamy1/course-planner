import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const ical = require('ical.js');

interface Event {
    start: moment.Moment;
    end: moment.Moment;
    title: string;
    description: string;
    location: string;
    uid: string;
}

const LocalCalendar: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(JSON.parse(localStorage.getItem('events') || ""));

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

    const handleImport = (icalData: string) => {
        const parsedEvents = ical.parseICS(icalData);
        const newEvents = parsedEvents.events.map((e: any) => {
            return {
                start: e.start,
                end: e.end,
                title: e.summary,
                description: e.description,
                location: e.location,
                uid: e.uid
            };
        });
        setEvents([...events, ...newEvents]);
    };

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
