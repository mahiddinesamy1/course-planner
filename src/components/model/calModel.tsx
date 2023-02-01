import CalEvent from './calEvent'
import React, {useState, createContext, useEffect, useRef} from 'react'
import {getValue, setValue} from './localStore';

type CalModelContextProps = {
    events: CalEvent[],
    setEvents: React.Dispatch<React.SetStateAction<CalEvent[]>>;
}

export const CalModelContext = createContext<CalModelContextProps>({} as CalModelContextProps);

type CalModelProps = {
    children: React.ReactNode;
}

const LOCAL_STORE_KEY = 'events';

export const CalModel: React.FC<CalModelProps> = ({children}) => {
    const [events, setEvents] = useState<CalEvent[]>([]); // creates a dummy array because of SSR and client-server HTML dif exception

    const isFirstRender = useRef<boolean>(true);

    useEffect(()=>{ // loads true data from local storage on boot
        setEvents(getValue(LOCAL_STORE_KEY, "[]"));
    }, []);

    useEffect(()=>{
        if (isFirstRender.current) { // prevent data override when useState creates the dummy array that will be replaced by boot use state
            isFirstRender.current=false;
        } else { // updates local storage once data changes
            setValue(LOCAL_STORE_KEY, events);
        }
    }, [events]);

    return (
        <CalModelContext.Provider value = {{events, setEvents}}>
            {children}
        </ CalModelContext.Provider>
    )
}