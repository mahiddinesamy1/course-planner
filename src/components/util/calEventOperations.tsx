import CalEvent from '@/components/model/calEvent'
const ical = require('ical.js');

export const mapICALtoEvent = (icalData: string):CalEvent[] => {
    const baseComponent = new ical.Component(ical.parse(icalData));
    const vEvents = baseComponent.getAllSubcomponents('vevent');
    const calEvents = vEvents.map((vEvent: any) => {
        return {
            start: vEvent.getFirstPropertyValue('dtstart').toJSDate(),
            end: vEvent.getFirstPropertyValue('dtend').toJSDate(),
            title: vEvent.getFirstPropertyValue('summary'),
            description: vEvent.getFirstPropertyValue('description'),
            location: vEvent.getFirstPropertyValue('location'),
            uid: vEvent.getFirstPropertyValue('uid')
        }
    });
    return calEvents;
}

export const findEarliestEventDate = (events: CalEvent[]):Date => {
    const eventStart = events.map((event:CalEvent)=>{return event.start});
    return eventStart.reduce((earliestEventYet:Date, event:Date) => {return earliestEventYet < event ? earliestEventYet : event}, new Date());
}