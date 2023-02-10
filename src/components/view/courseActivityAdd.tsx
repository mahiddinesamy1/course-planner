import { CalControllerContext } from "@/components/controller/calController";
import { Timeline } from "antd";
import React, { useState, useContext } from "react";

import { CalEvent } from "../model/calEvent"
import { CalModelContext } from "../model/calModel";

interface Props {}

const CourseActivityAdd: React.FC<Props> = () => {
  const { events } = useContext(CalModelContext);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [allowSubmissionsFromDate, setAllowSubmissionsFromDate] =
    useState<Date | null>(null);
  const [cutoffDate, setCutoffDate] = useState<Date | null>(null);
  const [timeOpen, setTimeOpen] = useState<Date | null>(null);
  const [timeClose, setTimeClose] = useState<Date | null>(null);
  const [timeLimit, setTimeLimit] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");
  const [group, setGroup] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [session, setSession] = useState<number>(0);

  const { notifyAddActivity } = useContext(CalControllerContext);
  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(new Date(event.target.value));
    //console.log(new Date(event.target.value))
  };

  const handleAllowSubmissionsFromDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllowSubmissionsFromDate(new Date(event.target.value));
  };

  const handleCutoffDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCutoffDate(new Date(event.target.value));
  };

  const handleTimeOpenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeOpen(new Date(event.target.value));
  };

  const handleTimeCloseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeClose(new Date(event.target.value));
  };

 
  const verifyDateWithCalendarEvents = (event: CalEvent) => {
    //const courseTitle = event.title.substring(7, event.title.indexOf("("));
    if (event.title.includes("Labo") || event.title.includes("C")) {
      if (dueDate) {
        console.log("on voit la data dueDAte" + dueDate.getTime());
        console.log("on voit la data event" + event.start.getTime());
        console.log(dueDate.getTime() === event.start.getTime());
        return dueDate.getTime() === event.start.getTime();
      }
    }
    return false;
  };

  //const isValidDate = events.some(verifyDateWithCalendarEvents);

  const addCourseActivity = () => {
    //await notifyAddActivity(code, group, year, session);
    const isValidDate = events.some(verifyDateWithCalendarEvents);
    if (isValidDate) {
      const newEvent = new CalEventModel(
        dueDate as Date,
        dueDate as Date,
        "Cours (EXE123)",
        "",
        "",
        ""
      );

      newEvent.start = dueDate as Date;
      newEvent.end = dueDate as Date;
      newEvent.title = "Cours (Room 123)";
      events.push(newEvent);
      setDueDate(null);
      setAllowSubmissionsFromDate(null);
      setCutoffDate(null);
      setTimeOpen(null);
      setTimeClose(null);
      setTimeLimit(null);

      
    } else {
      setErrorMessage("Date already taken, choose another date");
    }
  };

  return (
    <div>
      <h2>Liste of added activites</h2>
      <div>
        <p>Due Date: {dueDate?.toString()}</p>
        <p>
          Allow Submissions From Date: {allowSubmissionsFromDate?.toString()}
        </p>
        <p>Cutoff Date: {cutoffDate?.toString()}</p>

        <p>
          Time Open: {timeOpen ? new Date(timeOpen).toLocaleTimeString() : ""}
        </p>
        <p>
          Time Close:{" "}
          {timeClose ? new Date(timeClose).toLocaleTimeString() : ""}
        </p>
      </div>
      <h2>Add Course Activity</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          onChange={handleDueDateChange}
        />
      </div>
      <div>
        <label htmlFor="allowSubmissionsFromDate">
          Allow Submissions From Date:
        </label>
        <input
          type="date"
          id="allowSubmissionsFromDate"
          name="allowSubmissionsFromDate"
          onChange={handleAllowSubmissionsFromDateChange}
        />
      </div>
      <div>
        <label htmlFor="cutoffDate">Cutoff Date:</label>
        <input
          type="date"
          id="cutoffDate"
          name="cutoffDate"
          onChange={handleCutoffDateChange}
        />
      </div>
      <div>
        <label htmlFor="timeOpen">Time Open:</label>
        <input
          type="date"
          id="timeOpen"
          name="timeOpen"
          onChange={handleTimeOpenChange}
        />
      </div>
      <div>
        <label htmlFor="timeClose">Time Close:</label>
        <input
          type="date"
          id="timeClose"
          name="timeClose"
          onChange={handleTimeCloseChange}
        />
      </div>
      <button onClick={addCourseActivity}>Add Course Activity</button>
    </div>
  );
};

export default CourseActivityAdd;
