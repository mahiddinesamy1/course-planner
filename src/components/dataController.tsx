import React, {PropsWithChildren} from 'react';
import DataControllerContext from "./dataControllerContext";
import Event from '../model/event'
const ical = require('ical.js');

interface DataControllerProps {}

const DataController: React.FC<PropsWithChildren<DataControllerProps>> = ({children}) => {
    const notifyCourseFormSubmit = async (code: string, group: number, year: number, semester:number) => {
        
        // Fetch course planning from ETSMTL
        const url = new URL('https://portail.etsmtl.ca/ICal/SeancesCours');
        url.searchParams.set('Sigle', code);
        url.searchParams.set('Groupe', group < 9 ? "0"+group : ""+group);
        url.searchParams.set('Session', year+""+semester);

        const finalUrl = `/api/proxy?url=${encodeURIComponent(url.href)}`;
        const data  = await fetch(finalUrl);
        const textData = await data.text();

        // Add to calendar data
        const currentEvents = JSON.parse(localStorage.getItem('events') || "[]");
        const parsedEvents = ical.parseICS(textData);
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
        const filteredEvents = newEvents.filter((event: Event) => !currentEvents.find((newEvent: Event) => newEvent.uid === event.uid));
        localStorage.setItem('events', JSON.stringify(filteredEvents));
    }

    return (
        <DataControllerContext.Provider value={{notifyCourseFormSubmit}}>
            {children}
        </DataControllerContext.Provider>
    );
}

export default DataController