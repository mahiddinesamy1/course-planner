import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalEvent from 'src/model/calEvent'
import CAL_CHANGE_EVENT_KEY from 'src/components/controller/dataController'

const LocalCalendar: React.FC = () => {
    const [events, setEvents] = useState<CalEvent[]>(JSON.parse(typeof window === "undefined" ? "[]" : localStorage.getItem('events') || "[]"));


    const updateStateOnStorageChange = (event: StorageEvent) => {
        if (event.key === null) {  
            console.log("in")    
            setEvents(JSON.parse(localStorage.getItem('events') || "[]"));
        }
    };
    
    // use local storage state on mount and cleanup on unmount
    useEffect(() => {
        window.addEventListener('storage', updateStateOnStorageChange);
        return () => window.removeEventListener('storage', updateStateOnStorageChange);
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
