import React, {useContext} from "react";
import {CalControllerContext} from "@/components/controller/calController";

interface ClearCalProps {}

const ClearCalButton: React.FC<ClearCalProps> = () => {
    const {notifyClearCal} = useContext(CalControllerContext); 
    
    return (
        <button onClick={notifyClearCal}>
        Supprimer
        </button>
    );
};

export default ClearCalButton;
