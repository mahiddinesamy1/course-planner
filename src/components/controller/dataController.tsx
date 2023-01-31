import React, {PropsWithChildren} from 'react';
import DataControllerContext from "./dataControllerContext";
import CalEvent from '@/model/calEvent'
import fetchCourseICAL from './util/fetchCourseICAL'
import mapICALtoEvent from './util/mapICALtoEvent';

interface DataControllerProps {}

const DataController: React.FC<PropsWithChildren<DataControllerProps>> = ({children}) => {
    const notifyCourseFormSubmit = async (code: string, group: number, year: number, semester:number) => {
        const textData = await fetchCourseICAL(code, group, year, semester);

        const currentEvents = JSON.parse(localStorage.getItem('events') || "[]");
        const newEvents = mapICALtoEvent(textData);
        const filteredEvents = newEvents.filter((event: CalEvent) => !currentEvents.find((newEvent: CalEvent) => newEvent.uid === event.uid));

        localStorage.setItem('events', JSON.stringify([...filteredEvents, ...currentEvents]));
        window.dispatchEvent(new StorageEvent('storage'));
    }

    const notifyClearCal = () => {
        localStorage.removeItem('events');
        window.dispatchEvent(new StorageEvent('storage'));
    }

    return (
        <DataControllerContext.Provider value={{notifyCourseFormSubmit, notifyClearCal}}>
            {children}
        </DataControllerContext.Provider>
    );
}

export default DataController