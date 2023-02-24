import React, {useState, useContext, createContext, MouseEventHandler} from 'react';
import {CalEvent} from '@/components/model/interfaces/events/calEvent'
import fetchCourseICAL from './util/fetchCourseICAL'
import {addUniqueEvents, mapICALtoEvent} from './util/eventOperations';
import { EventModelContext } from '@/components/model/eventModel';
import { extractData, parseActivities, zipData } from './util/mbzInterpreter';
import { ArchiveFile } from '@/components/model/interfaces/archiveFile';
import { updateEventDates } from './util/updateEventDates';

type EventControllerContextProps = {
    notifyCourseFormSubmit : (code: string, group: number, year: number, semester:number) => void;
    notifyClearCal : () => void;
    //notifyUpdateEvent: MouseEventHandler<HTMLButtonElement>;
    notifyUpdateEvent: (eventId: string, newStart: Date, newEnd: Date) => void;
    notifyMBZSubmited : (file: File) => void;
    notifyMBZDownload : (oldURL: string) => string;
    setSelectedEvent: (event: CalEvent) => void;
}

export const EventControllerContext = createContext<EventControllerContextProps>({} as EventControllerContextProps);

type CalControllerProps = {
    children: React.ReactNode;
}

export const EventController: React.FC<CalControllerProps> = ({children}) => {
    const {courseEvents, setCourseEvents, MBZEvents, setMBZEvents} = useContext(EventModelContext);
    const [mbzData, setMVZData] = useState<{[key:string]:ArchiveFile}>({});
   
    const notifyCourseFormSubmit = async (code: string, group: number, year: number, semester:number) => {
        const textData = await fetchCourseICAL(code, group, year, semester);
        const newEvents = mapICALtoEvent(textData);
        addUniqueEvents(newEvents, courseEvents);
        setCourseEvents({...courseEvents});
    }

    const notifyClearCal = () => {
        setCourseEvents({});
        setMBZEvents({});
    }

    const notifyMBZSubmited = async (file: File) => {
        const fileData = await extractData(file);
        setMVZData(fileData);
        const newMBZEvents = await parseActivities(fileData);
        addUniqueEvents(newMBZEvents, MBZEvents);
        setMBZEvents({...MBZEvents});
    }

    const notifyMBZDownload = (oldURL: string) => {
        URL.revokeObjectURL(oldURL);
        const file = new Blob([zipData(mbzData)], { type: 'application/octet-stream' });        
        return URL.createObjectURL(file);
    }

    const notifyUpdateEvent = (eventId: string, newStart: Date, newEnd: Date) => {
 
        //  const updatedEvents = updateEventDates(MBZEvents,newStart, newEnd );
          // addUniqueEvents(updatedEvents, MBZEvents);
           setMBZEvents({...MBZEvents});
     
      };
    
      const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);

     const handleSetSelectedEvent = (event: CalEvent) => {
        setSelectedEvent(event);
        };
      const onSelectEvent = (event: CalEvent, e: any) => {
        setSelectedEvent(event);
      };

    return (
        <EventControllerContext.Provider value={{setSelectedEvent ,notifyCourseFormSubmit, notifyClearCal, notifyUpdateEvent, notifyMBZSubmited, notifyMBZDownload}}>
            {children}
        </EventControllerContext.Provider>
    );
}

