import React, { useState, useContext } from "react";
import {EventControllerContext} from "@/components/controller/eventController";

interface Props {}

const FilePickerMBZ: React.FC<Props> = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const {notifyMBZSubmited} = useContext(EventControllerContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.value);
    if (event.target.files != null) {
      notifyMBZSubmited(event.target.files[0]);
    }
    };

  return (
    <div>
      <input type="file" onInput={handleFileChange} />
    </div>
  );
};

export default FilePickerMBZ;
