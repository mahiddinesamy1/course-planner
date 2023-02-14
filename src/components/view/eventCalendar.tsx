import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalModelContext } from '@/components/model/calModel';
import {findEarliestEventDate} from '../controller/util/calEventOperations'

const EventCalendar: React.FC = () => {
    const {events} = useContext(CalModelContext);
    const [selectedDate, setSelectedDate] = useState<Date>(findEarliestEventDate(events));

    
    useEffect(() => {
        setSelectedDate(findEarliestEventDate(events));
    }, [events]);

    const onNavigate = (newDate: Date) => {
        setSelectedDate(newDate);
    }

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
            />
        </div>
    );
};

export default EventCalendar;
