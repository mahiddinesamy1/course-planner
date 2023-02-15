import React, { useState, useContext } from "react";
import {CalControllerContext} from "@/components/controller/calController";

interface Props {}

const FilePicker: React.FC<Props> = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const {notifyFileSubmited} = useContext(CalControllerContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.value);
    if (event.target.files != null) {
        notifyFileSubmited(event.target.files[0]);
    }
    };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FilePicker;
