import React, {PropsWithChildren, useContext, createContext} from 'react';
import {CalEvent} from '@/components/model/calEvent'
import fetchCourseICAL from '../util/fetchCourseICAL'
import {mapICALtoEvent} from '../util/calEventOperations';
import { CalModelContext } from '@/components/model/calModel';

type CalControllerContextProps = {
    notifyCourseFormSubmit : (code: string, group: number, year: number, semester:number) => void;
    notifyClearCal : () => void;
    notifyAddActivity : () => void;
}

export const CalControllerContext = createContext<CalControllerContextProps>({} as CalControllerContextProps);

type CalControllerProps = {
    children: React.ReactNode;
}

export const CalController: React.FC<CalControllerProps> = ({children}) => {
    const {events, setEvents} = useContext(CalModelContext);

    const notifyCourseFormSubmit = async (code: string, group: number, year: number, semester:number) => {
        const textData = await fetchCourseICAL(code, group, year, semester);

        const newEvents = mapICALtoEvent(textData);
        const filteredEvents = newEvents.filter((event: CalEvent) => !events.find((newEvent: CalEvent) => newEvent.uid === event.uid));
        setEvents([...filteredEvents, ...events]);
    }

    const notifyClearCal = () => {
        setEvents([]);
    }
     const notifyAddActivity = () => {
        setEvents([]);
    }
    return (
        <CalControllerContext.Provider value={{notifyCourseFormSubmit, notifyClearCal, notifyAddActivity}}>
            {children}
        </CalControllerContext.Provider>
    );
}