import React, { useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalDataContext } from '@/model/calData';

const LocalCalendar: React.FC = () => {
    const {events} = useContext(CalDataContext);

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
