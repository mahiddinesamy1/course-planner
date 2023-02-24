import { EventDict } from "@/components/model/eventModel";
import { CalEvent } from "@/components/model/interfaces/events/calEvent";

export const findEarliestEventDate = (events: CalEvent[]):Date => {
    const eventStart = events.map((event:CalEvent)=>{return event.start});
    return eventStart.reduce((earliestEventYet:Date, event:Date) => {return earliestEventYet < event ? earliestEventYet : event}, new Date());
}

export const addUniqueEvents = (events: CalEvent[], addToCollection: EventDict):void => {
    for (let event of events) {
        if (!(event.uid in addToCollection)) {
            addToCollection[event.uid] = event;
        }
    }
}