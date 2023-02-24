import { EventDict, MBZEventDict } from '@/components/model/eventModel';

import { MBZEvent} from '@/components/model/interfaces/events/mbzEvent';

import { CalEvent } from '@/components/model/interfaces/events/calEvent';

/*export const updateEventDates = (newStartDate: Date, newEndDate: Date, events: MBZEventDict, id:string): MBZEventDict => {
  const updatedEvents: MBZEventDict = {};

  Object.keys(events).forEach((eventId) => {
    const event = events[eventId];
    if (event.uid === id) {
      const updatedEvent: MBZEvent = {
        ...event,
        start: new Date(newStartDate.getTime() + (event.start.getTime() - new Date(event.start).setHours(0,0,0,0))),
        end: new Date(newEndDate.getTime() + (event.end.getTime() - new Date(event.end).setHours(0,0,0,0))),
      };
      updatedEvents[eventId] = updatedEvent;
    } else {
      updatedEvents[eventId] = event;
    }
  });

  return updatedEvents;
};*/
export const updateEventDates = (eventsToUpdate: CalEvent[], newStartDate: Date, newEndDate: Date): CalEvent[] => {
    const updatedEvents = eventsToUpdate.map(event => ({
      ...event,
      start: newStartDate,
      end: newEndDate,
    }));
  
    const updatedEventDict = updatedEvents.reduce((eventDict, event) => ({
      ...eventDict,
      [event.uid]: event,
    }), []);
  
    return updatedEventDict;
  };