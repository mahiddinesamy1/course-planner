import {CalEvent, CalEventType} from '@/components/model/calEvent'
const ical = require('ical.js');

export const mapICALtoEvent = (icalData: string):CalEvent[] => {
    const baseComponent = new ical.Component(ical.parse(icalData));
    const vEvents = baseComponent.getAllSubcomponents('vevent');
    const calEvents = vEvents.map((vEvent: any) => {
        return {
            start: vEvent.getFirstPropertyValue('dtstart').toJSDate(),
            end: vEvent.getFirstPropertyValue('dtend').toJSDate(),
            title: vEvent.getFirstPropertyValue('summary').trim(),
            description: vEvent.getFirstPropertyValue('description').trim(),
            type: iCalCategoryToType(vEvent.getFirstPropertyValue('categories').trim()),
            location: vEvent.getFirstPropertyValue('location').trim(),
            uid: vEvent.getFirstPropertyValue('uid').trim()
        }
    }).filter((event:CalEvent) => {return event.type != undefined});

    return calEvents;
}

export const findEarliestEventDate = (events: CalEvent[]):Date => {
    const eventStart = events.map((event:CalEvent)=>{return event.start});
    return eventStart.reduce((earliestEventYet:Date, event:Date) => {return earliestEventYet < event ? earliestEventYet : event}, new Date());
}

function iCalCategoryToType(icalCategory: string): CalEventType|undefined {
    let type: CalEventType|undefined;
    switch (icalCategory) {
        case "Labo": {
            type= CalEventType.Laboratories
            break;
        }
        case "C": {
            type= CalEventType.Seminar
            break;
        }
        default: { 
            console.log("Type ", icalCategory, " unsupported")
            break; 
         } 
    }
    return type;
}