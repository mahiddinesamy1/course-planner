import CalEvent from './calEvent'
import React, {useState, createContext, useEffect} from 'react'


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
    const [events, setEvents] = useState<CalEvent[]>(JSON.parse(typeof window === "undefined" ? "[]" : localStorage.getItem(LOCAL_STORE_KEY) || "[]"));

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(events));
    }, [events]);

    return (
        <CalModelContext.Provider value = {{events, setEvents}}>
            {children}
        </ CalModelContext.Provider>
    )
}