import React, {useState, useContext, createContext} from 'react';
import {CalEvent} from '@/components/model/calEvent'
import fetchCourseICAL from './util/fetchCourseICAL'
import {mapICALtoEvent} from './util/calEventOperations';
import { CalModelContext } from '@/components/model/calModel';
import { extractData, parseActivities, zipData } from './util/mbzInterpreter';
import { ArchiveFile } from '../model/archiveFile';

type CalControllerContextProps = {
    notifyCourseFormSubmit : (code: string, group: number, year: number, semester:number) => void;
    notifyClearCal : () => void;
    notifyFileSubmited : (file: File) => void;
    notifyMBZDownload : (oldURL: string) => string;
}

export const CalControllerContext = createContext<CalControllerContextProps>({} as CalControllerContextProps);

type CalControllerProps = {
    children: React.ReactNode;
}

export const CalController: React.FC<CalControllerProps> = ({children}) => {
    const {events, setEvents} = useContext(CalModelContext);
    const [mbzData, setMVZData] = useState<ArchiveFile[]>([]);
    
    
    const notifyCourseFormSubmit = async (code: string, group: number, year: number, semester:number) => {
        const textData = await fetchCourseICAL(code, group, year, semester);

        const newEvents = mapICALtoEvent(textData);
        const filteredEvents = newEvents.filter((event: CalEvent) => !events.find((newEvent: CalEvent) => newEvent.uid === event.uid));
        setEvents(currentEvents => [...currentEvents, ...filteredEvents]);
    }

    const notifyClearCal = () => {
        setEvents([]);
    }

    const notifyFileSubmited = async (file: File) => {
        const fileData = await extractData(file);
        setMVZData(fileData);
        const mbzEvents = await parseActivities(fileData);
        setEvents(currentEvents => [...currentEvents, ...mbzEvents]);
    }

    const notifyMBZDownload = (oldURL: string) => {
        URL.revokeObjectURL(oldURL);
        const file = new Blob([zipData(mbzData)], { type: 'application/octet-stream' });        
        return URL.createObjectURL(file);
    }

    return (
        <CalControllerContext.Provider value={{notifyCourseFormSubmit, notifyClearCal, notifyFileSubmited, notifyMBZDownload}}>
            {children}
        </CalControllerContext.Provider>
    );
}