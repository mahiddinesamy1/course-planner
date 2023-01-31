import {createContext} from 'react'

interface DataControllerContextProps {
    notifyCourseFormSubmit : (code: string, group: number, year: number, semester:number) => void;
    notifyClearCal : () => void;
}

const DataControllerContext = createContext<DataControllerContextProps>({
    notifyCourseFormSubmit: (code: string, group: number, year: number, semester:number) => {},
    notifyClearCal: () => {}
});

export default DataControllerContext