import React, {useContext, useState} from "react";
import {CalControllerContext} from "@/components/controller/calController";

const DownloadMBZButton: React.FC<{}> = () => {
    const [downloadLink, setDownloadLink] = useState<string>("");
    const {notifyMBZDownload} = useContext(CalControllerContext);

    const handleOnClick = () => {
        const downloadURL = notifyMBZDownload(downloadLink);
        setDownloadLink(downloadURL);
    }
    


    return (
        <a onClick={handleOnClick} download="moodle_course.zip" href={downloadLink}>
            <button>
            download
            </button>
        </a>
    );
};

export default DownloadMBZButton;
