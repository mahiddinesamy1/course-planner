import React, {PropsWithChildren, useContext} from 'react';
import DataControllerContext from "./dataControllerContext";
import CalEvent from '@/model/calEvent'
import fetchCourseICAL from './util/fetchCourseICAL'
import mapICALtoEvent from './util/mapICALtoEvent';
import { CalDataContext } from '@/model/calData';

interface DataControllerProps {}

const DataController: React.FC<PropsWithChildren<DataControllerProps>> = ({children}) => {
    const {events, setEvents} = useContext(CalDataContext);

    const notifyCourseFormSubmit = async (code: string, group: number, year: number, semester:number) => {
        const textData = await fetchCourseICAL(code, group, year, semester);

        const newEvents = mapICALtoEvent(textData);
        const filteredEvents = newEvents.filter((event: CalEvent) => !events.find((newEvent: CalEvent) => newEvent.uid === event.uid));

        setEvents([...filteredEvents, ...events]);
    }

    const notifyClearCal = () => {
        setEvents([]);
    }

    return (
        <DataControllerContext.Provider value={{notifyCourseFormSubmit, notifyClearCal}}>
            {children}
        </DataControllerContext.Provider>
    );
}

export default DataController