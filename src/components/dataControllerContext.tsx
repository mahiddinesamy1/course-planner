import {createContext} from 'react'

interface DataControllerContextProps {
    notifyCourseFormSubmit : (code: string, group: number, year: number, semester:number) => void;
}

const DataControllerContext = createContext<DataControllerContextProps>({
    notifyCourseFormSubmit: (code: string, group: number, year: number, semester:number) => {}
});

export default DataControllerContext