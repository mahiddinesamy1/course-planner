import CalEvent from './calEvent'
import React, {useState, createContext, useEffect} from 'react'


type CalDataContextProps = {
    events: CalEvent[],
    setEvents: React.Dispatch<React.SetStateAction<CalEvent[]>>;
}

export const CalDataContext = createContext<CalDataContextProps>({} as CalDataContextProps);

type CalDataProps = {
    children: React.ReactNode;
}

const LOCAL_STORE_KEY = 'events';

export const CalData: React.FC<CalDataProps> = ({children}) => {
    const [events, setEvents] = useState<CalEvent[]>(JSON.parse(typeof window === "undefined" ? "[]" : localStorage.getItem(LOCAL_STORE_KEY) || "[]"));

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(events));
    }, [events]);

    return (
        <CalDataContext.Provider value = {{events, setEvents}}>
            {children}
        </ CalDataContext.Provider>
    )
}